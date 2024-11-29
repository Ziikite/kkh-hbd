import requests
import pandas as pd
import re
<<<<<<< HEAD
=======
import time
>>>>>>> 738ab07 (Initial commit)

# Twitter API Bearer Token
BEARER_TOKEN = "AAAAAAAAAAAAAAAAAAAAAEBjxAEAAAAA0xfY87KUymqV%2FSz5wiupNqlRbSY%3DKuZNfVeDJT8GGofaEn1dU9I5K3tFva35E3nFq9iPzZCR7ojsn8"

<<<<<<< HEAD
# 요청 URL과 파라미터 설정
query = "%23생일축하 lang:ko"  # #생일축하 해시태그와 한국어 필터링
url = f"https://api.twitter.com/2/tweets/search/recent?query={query}&tweet.fields=created_at"
=======
# 요청 URL
url = "https://api.twitter.com/2/tweets/search/recent"
>>>>>>> 738ab07 (Initial commit)

# 요청 헤더
headers = {
    "Authorization": f"Bearer {BEARER_TOKEN}"
}

# 이름 제거 함수
def remove_names(text):
<<<<<<< HEAD
    # 정규식으로 한국 이름 탐지 및 제거 (성 + 한 글자 또는 두 글자 이름)
    name_pattern = re.compile(r'\b[가-힣]{1,2}(씨|님)?\b')
    return name_pattern.sub('', text)

# API 호출
response = requests.get(url, headers=headers)

# 응답 처리
if response.status_code == 200:
    print("API 호출 성공!")
    data = response.json()

    # 트윗 데이터 가져오기
    tweets = data.get("data", [])
    if tweets:
        # 데이터를 DataFrame으로 변환
        df = pd.DataFrame(tweets)

        # 이름 제거 처리
        df["text"] = df["text"].apply(remove_names)

        # 중복 제거
        df = df.drop_duplicates(subset="text")

        # CSV 파일로 저장
        df.to_csv("birthday_messages.csv", index=False, encoding="utf-8")
        print(f"데이터가 'birthday_messages.csv'에 저장되었습니다! 저장된 행 수: {len(df)}")
    else:
        print("검색된 트윗 데이터가 없습니다.")
else:
    print(f"API 호출 실패: {response.status_code}")
    print(response.text)
=======
    name_pattern = re.compile(r'\b[가-힣]{1,2}(씨|님)?\b')
    return name_pattern.sub('', text)

# 데이터 저장 리스트
all_tweets = []

# 페이지네이션
next_token = None
while True:
    # 요청 파라미터 설정
    params = {
        "query": "#생일축하 lang:ko",
        "tweet.fields": "created_at",
        "next_token": next_token
    }
    
    # API 호출
    response = requests.get(url, headers=headers, params=params)
    
    if response.status_code == 200:
        data = response.json()
        tweets = data.get("data", [])
        all_tweets.extend(tweets)
        
        # 다음 페이지 토큰
        next_token = data.get("meta", {}).get("next_token", None)
        
        # 다음 페이지가 없으면 종료
        if not next_token:
            break
        
        # 요청 간격 조정 (1초 대기)
        time.sleep(1)
    elif response.status_code == 429:
        # 요청 제한 발생 시 대기
        print("요청 제한 도달. 60초 대기 중...")
        time.sleep(60)
    else:
        print(f"API 호출 실패: {response.status_code}")
        print(response.text)
        break

# 데이터프레임 생성 및 저장
df = pd.DataFrame(all_tweets)
df["text"] = df["text"].apply(remove_names)  # 이름 제거
df = df.drop_duplicates(subset="text")  # 중복 제거
df.to_csv("birthday_messages.csv", index=False, encoding="utf-8-sig")
print(f"총 {len(df)}개의 트윗이 저장되었습니다!")
>>>>>>> 738ab07 (Initial commit)
