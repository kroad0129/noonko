import os
import torch
from bert_utils.tokenizer import setup_tokenizer_and_model
from bert_utils.embedding import encode_text, calculate_similarity
from data_utils.file_handler import read_file, load_embeddings

# GPU 설정
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# 경로 설정
MODEL_PATH = "./bert_eojeol_pytorch/"
VOCAB_PATH = "./bert_eojeol_pytorch/vocab.korean.rawtext.list"
STORY_FILE_PATH = "story_details.txt"
EMBEDDING_DIR = "./embeddings/"


def main():
    tokenizer, model = setup_tokenizer_and_model(MODEL_PATH, VOCAB_PATH, device)

    print("사연 데이터 읽기")
    story_text = read_file(STORY_FILE_PATH)

    print("사연 데이터 임베딩 시작")
    story_embedding = encode_text(story_text, tokenizer, model, device)

    while True:
        file_name = input("사용할 임베딩 파일명을 입력하세요 (예: 1_embeddings.npz): ").strip()
        embedding_file_path = os.path.join(EMBEDDING_DIR, file_name)

        if os.path.isfile(embedding_file_path):
            print(f"선택된 임베딩 파일: {embedding_file_path}")
            break
        else:
            print("[ERROR] 해당 파일이 존재하지 않음")

    print("판례 임베딩 불러오기")
    case_ids, case_embeddings = load_embeddings(embedding_file_path, device)

    print("유사도 계산 시작")
    similarities = calculate_similarity(story_embedding, case_embeddings)

    top_k = 10
    top_k_indices = torch.topk(similarities, k=top_k).indices
    top_k_similarities = similarities[top_k_indices].tolist()

    print("\n상위 10개 유사한 판례:")
    for rank, idx in enumerate(top_k_indices):
        print(f"{rank + 1}. 판례정보일련번호: {case_ids[idx]}, 유사도 값: {top_k_similarities[rank]:.4f}")


if __name__ == "__main__":
    main()
