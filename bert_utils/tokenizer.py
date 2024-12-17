import os
import sys
import torch
from transformers import BertModel

SRC_TOKENIZER_PATH = os.path.abspath('./bert_eojeol_pytorch/src_tokenizer')
if SRC_TOKENIZER_PATH not in sys.path:
    sys.path.append(SRC_TOKENIZER_PATH)

try:
    from tokenization import BertTokenizer
except ImportError:
    raise FileNotFoundError("tokenization.py 파일 경로 재설정 필요")

def setup_tokenizer_and_model(model_path, vocab_path, device):
    tokenizer = BertTokenizer(vocab_file=vocab_path)
    model = BertModel.from_pretrained(model_path, ignore_mismatched_sizes=True).to(device)
    print("모델 및 토크나이저 로드 완료")
    return tokenizer, model

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

if __name__ == "__main__":
    MODEL_PATH = "./bert_eojeol_pytorch/"
    VOCAB_PATH = "./bert_eojeol_pytorch/vocab.korean.rawtext.list"

    tokenizer, model = setup_tokenizer_and_model(MODEL_PATH, VOCAB_PATH, device)
    print("토크나이저와 모델 설정 완료")
