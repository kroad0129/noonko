from flask import Flask, request, jsonify
from law_search_api import get_cases, get_case_detail
from case_comparison import parse_case_xml, find_top_similar_cases
import xml.etree.ElementTree as ET  # ET 모듈을 추가로 import

app = Flask(__name__)

# 판례 상세 정보를 JSON 형태로 반환하는 함수
def display_case_detail(xml_content):
    try:
        root = ET.fromstring(xml_content)
        case_detail = {
            "사건번호": root.findtext('판례정보일련번호', ''),
            "사건명": root.findtext('사건명', ''),
            "법원명": root.findtext('법원명', ''),
            "선고일자": root.findtext('선고일자', ''),
            "판례내용": root.findtext('판례내용', ''),
        }
        return case_detail
    except Exception as e:
        print(f"판례 상세 정보를 파싱하는 중 오류 발생: {e}")
        return {"error": str(e)}

# 유사도가 높은 판례를 검색하는 엔드포인트
@app.route('/search_cases', methods=['POST'])
def search_cases():
    data = request.json
    user_story = data.get('user_story')
    query = data.get('query')

    try:
        # 판례 목록 검색
        case_list_xml = get_cases(query)
        cases = parse_case_xml(case_list_xml)

        if not cases:
            return jsonify({"message": "검색 결과가 없습니다."}), 404

        # 유사도가 높은 5개의 판례 검색
        top_similar_cases = find_top_similar_cases(user_story, cases, top_n=5)
        result = [
            {
                "사건명": case['사건명'],
                "사건번호": case['사건번호'],
                "법원명": case['법원명'],
                "선고일자": case['선고일자'],
                "유사도": similarity
            }
            for case, similarity in top_similar_cases
        ]
        return jsonify(result)

    except Exception as e:
        print(f"검색 중 오류 발생: {e}")
        return jsonify({"error": str(e)}), 500

# 판례 상세 정보를 조회하는 엔드포인트
@app.route('/case_detail', methods=['GET'])
def case_detail():
    case_id = request.args.get('case_id')
    try:
        case_detail_xml = get_case_detail(case_id)
        case_detail = display_case_detail(case_detail_xml)
        return jsonify(case_detail)
    except Exception as e:
        print(f"판례 상세 조회 중 오류 발생: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
