import requests
import json 
import random 
import lorem

url = "http://localhost:8082/api/"

def review_insert():
    headers = {"Content-Type": "application/json"}

    UIDs = [];
    reviews = [
        {
            "reviewAuthorID": 1,
            "reviewSubjectID": 35,
            "reviewTitle": "Interesting Review",
            "reviewText": lorem.paragraph(),
            "isPublic": True
        },
        {
            "reviewAuthorID": 2,
            "reviewSubjectID": 80,
            "reviewTitle": "My review",
            "reviewText": lorem.paragraph(),
            "isPublic": True
        },
        {
            "reviewAuthorID": 3,
            "reviewSubjectID": 156,
            "reviewTitle": "Bla Bla Bla",
            "reviewText": lorem.paragraph(),
            "isPublic": True
        },
        {
            "reviewAuthorID": 4,
            "reviewSubjectID": 280,
            "reviewTitle": "School is awesome",
            "reviewText": lorem.paragraph(),
            "isPublic": True
        },
        {
            "reviewAuthorID": 5,
            "reviewSubjectID": 111,
            "reviewTitle": "FIIT NO MORE",
            "reviewText": lorem.paragraph(),
            "isPublic": True
        },
    ]


    for review in reviews:
        response = requests.request("POST", url + 'reviews', json=review, headers=headers)
        res = json.loads(response.text)
        uid = res['data']['uid']
        print(uid)
        UIDs.append(uid)

    return UIDs

def update_review(uid):
    url = "http://localhost:8082/api/reviews/" + uid

    payload = {
        "reviewAuthorID": random.randint(1, 6),
        "reviewSubjectID": random.randint(1, 300),
        "reviewTitle": "Updated review title",
        "reviewText": lorem.paragraph(),
        "isPublic": True
    }
    headers = {"Content-Type": "application/json"}

    response = requests.request("PUT", url, json=payload, headers=headers)
    res = json.loads(response.text)
    uid = res['data']['uid']
    print('Updated: ' + uid)

def update_some_reviews(UIDs):
    for uid in UIDs:
        update = bool(random.getrandbits(1))
        if update:
            update_review(uid)
    for uid in UIDs:
        update = bool(random.getrandbits(1))
        if update:
            update_review(uid)


uids = review_insert()
update_some_reviews(uids)