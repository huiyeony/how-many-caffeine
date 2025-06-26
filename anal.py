import pandas as pd
import requests

SUPABASE_URL = "https://mubpvfmidlvkfkyjqnki.supabase.co"
SUPABASE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11YnB2Zm1pZGx2a2ZreWpxbmtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1Mjg0NDIsImV4cCI6MjA2NDEwNDQ0Mn0.2tBQgIxWEKA76sEJLxDs_SAbmLd1XccnkPb1OnIM0gI"
HEADERS = {
    "apikey": SUPABASE_API_KEY,
    "Authorization": f"Bearer {SUPABASE_API_KEY}",
    "Content-Type": "application/json",
}

def fetch_logs():
    url = f"{SUPABASE_URL}/rest/v1/logs?select=element"
    res=requests.get(url, headers=HEADERS)
    res.raise_for_status()
    return pd.DataFrame(res.json())
def analyse_top_brands(df : pd.DataFrame):
    df_clean = df.dropna(subset=['element']) #0 이디야 
    counts = df_clean['element'].value_counts().reset_index() #이디야 1
    counts.columns = ["brand", "count"]
    counts["rank"] = range(1, len(counts) + 1) # 빽다방 2 , 이디야 1
    
    return counts.head(10)
def save_to_supabase(df : pd.DataFrame):
    url = f"{SUPABASE_URL}/rest/v1/popular_brands"
    res = requests.delete(url, params={"rank":"gte.1"}, headers=HEADERS)
    if(res.status_code >= 300):
        print(f"삭제 실패 {res.text}")
        
    else:
        print(f"삭제 성공")
    for _, row in df.iterrows():
        payload = {
            "brand" : row['brand'],
            "count" : row['count'],
            "rank" : row['rank']
        }
        res = requests.post(url,headers=HEADERS, json=payload)
        if(res.status_code >= 300):
            print(f'저장 실패 : {res.text}')
        else:
            print(f"저장 성공 ")
        
        
def main():
    df  = fetch_logs()
    result_df = analyse_top_brands(df)
    save_to_supabase(result_df)
if __name__ == '__main__':
    main()