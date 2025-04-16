# Noonko - AI 기반 법률 판례 유사도 분석 시스템

Noonko는 사용자가 입력한 사연을 바탕으로 법제처 OpenAPI를 활용하여 유사한 법률 판례를 자동으로 추천하는 AI 기반 법률 서비스입니다. Flask 백엔드와 BERT 임베딩 모델을 활용하여 높은 정확도의 판례 검색을 제공합니다.

---

## 🚀 주요 기능 (Features)

1. **유사도 분석 API 제공**: 사용자가 입력한 사연과 판례 데이터를 비교하여 상위 유사 판례를 추천.
2. **BERT 모델 활용**: 자연어 처리(NLP)를 통한 사연과 판례 임베딩 및 유사도 계산.
3. **법제처 OpenAPI 연동**: 실제 법률 데이터를 활용하여 사건명, 판시사항 요약, 선고일자를 제공합니다.
4. **React 프론트엔드와 연동**: 사용자 친화적인 UI에서 판례 검색 및 결과 확인 가능.
5. **CORS 설정**: 다양한 출처의 클라이언트 애플리케이션과 통신 가능.

---

## 🧠 시스템 아키텍처 (System Architecture)

1. **Frontend**: React 기반의 사용자 인터페이스 (별도 저장소 혹은 프로젝트 구조 필요)
2. **Backend**: Flask API 서버
   - API Endpoint: `/api/similarity`
   - Method: `POST`
   - Response: JSON 형식의 판례 추천 결과

3. **AI Model**: BERT를 이용한 임베딩 및 유사도 계산
4. **Data Source**: 법제처 OpenAPI (`http://www.law.go.kr/DRF/lawService.do`)

---

## ⚙️ 사용된 기술 스택 (Tech Stack)

- **Backend**: Flask, Flask-CORS, PyTorch, Requests
- **AI/NLP**: BERT 임베딩 모델, Cosine Similarity 계산
- **Frontend**: React (통신을 위한 CORS 설정 포함)
- **API**: 법제처 OpenAPI를 통한 판례 데이터 조회
- **Deployment**: 로컬 서버 (`port: 5000`)

---

## 🔍 사용 방법 (How to Use)

### 1. 프로젝트 클론

```bash
git clone https://github.com/kroad0129/noonko.git
cd noonko/backend
