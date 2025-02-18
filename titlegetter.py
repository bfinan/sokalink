import bs4
import requests

# Get the title of a webpage
def get_title(url):
    res = requests.get(url)
    res.raise_for_status()
    soup = bs4.BeautifulSoup(res.text, 'html.parser')
    return soup.title.string

# Test the function
url = "https://www.reddit.com/r/thinkpad/comments/1069co8/fan_control_in_linux/"
print(get_title(url))