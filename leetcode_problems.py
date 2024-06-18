import requests

deff get_all_problems():
    url = "https://alfa-leetcode-api.onrender.com/problems"
    all_problems = []
    page = 1
    while True:
        response = requests.get(url, params={"page": page})
        if response.status_code == 200:
            data = response.json()
            problems = data['problemsetQuestionList']
            all_problems.extend(problems)
            if len(problems) < 20:  # Assuming the API returns 20 problems per page
                break
            page += 1
        else:
            break
    return all_problems

problems = get_all_problems()
if problems:
    print("Retrieved problems data successfully")
    for problem in problems: 
        print(problem)
else:
    print("Failed to retrieve problems data")
