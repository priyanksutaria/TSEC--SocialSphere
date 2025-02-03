from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
from collections import Counter
from textblob import TextBlob
import numpy as np

app = Flask(__name__)
CORS(app)

ACCESS_TOKEN = ""

@app.route('/profile', methods=['GET'])
def fetch_user_profile():
    url = "https://graph.instagram.com/me"
    params = {
        "access_token": ACCESS_TOKEN,
        "fields": "id,username,media_count"
    }
    response = requests.get(url, params=params)
    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return jsonify({"error": "Failed to fetch profile"}), response.status_code

@app.route('/media', methods=['GET'])
def fetch_user_media():
    url = "https://graph.instagram.com/me/media"
    params = {
        "access_token": ACCESS_TOKEN,
        "fields": "id,caption,media_type,media_url,permalink,timestamp,like_count,comments_count",
        "limit": 20
    }
    all_media = []
    while url:
        response = requests.get(url, params=params)
        if response.status_code == 200:
            data = response.json()
            all_media.extend(data.get("data", []))
            url = data.get("paging", {}).get("next")
        else:
            return jsonify({"error": "Failed to fetch media"}), response.status_code
    return jsonify(all_media)

@app.route('/analyze', methods=['POST'])
def analyze_posts():
    media = request.json
    captions = [post.get("caption", "") for post in media]
    likes = [post.get("like_count", 0) for post in media]
    comments = [post.get("comments_count", 0) for post in media]
    all_words = " ".join(captions).split()

    word_freq = Counter(all_words)
    sentiments = [TextBlob(caption).sentiment.polarity for caption in captions]
    engagement_rates = [like + comment for like, comment in zip(likes, comments)]
    most_liked_post = media[np.argmax(likes)]

    avg_likes = np.mean(likes)
    avg_comments = np.mean(comments)
    avg_sentiment = np.mean(sentiments)

    # New Features
    content_types = {}
    for post in media:
        media_type = post.get("media_type", "")
        content_types[media_type] = content_types.get(media_type, 0) + 1

    positive = sum(1 for s in sentiments if s > 0)
    neutral = sum(1 for s in sentiments if s == 0)
    negative = sum(1 for s in sentiments if s < 0)

    hashtags = []
    for post in media:
        caption = post.get("caption", "")
        hashtags.extend([word.lower() for word in caption.split() if word.startswith("#")])
    hashtag_freq = Counter(hashtags)
    top_hashtags = hashtag_freq.most_common(5)

    analysis = {
        "word_freq": dict(word_freq.most_common(10)),
        "avg_likes": avg_likes,
        "avg_comments": avg_comments,
        "avg_sentiment": avg_sentiment,
        "most_liked_post": most_liked_post,
        "content_types": content_types,
        "sentiment_categories": {"positive": positive, "neutral": neutral, "negative": negative},
        "top_hashtags": dict(top_hashtags)
    }
    return jsonify(analysis)

if __name__ == '__main__':
    app.run(debug=True)
