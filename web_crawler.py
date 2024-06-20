import requests
from bs4 import BeautifulSoup
import re
import json

# build the web crawler object
class WebCrawler:

    # create three variables: start_url, max_depth, list of visited urls
    def __init__(self, start_url, max_depth=2, max_links=50, output_file='output_100_git.json'):
        self.start_url = start_url
        self.max_depth = max_depth # hoe many sublinks to follow 
        self.visited = set() # set object to avoid readding links that have been visited
        self.max_links = max_links
        self.output_file = output_file
    
    
    def is_successful(self):
        try:
            response = requests.get(self.start_url, timeout=20) # request the page info 
            response.raise_for_status() # raises exception when not a 2xx response
            if response.status_code == 200: # check if the status code is 200, a.k.a successful
                return True
            
            else: # if not, print the error with the status code
                print(f"The crawling could not being becasue of unsuccessful request with the status code of {response.status_code}.")
                return False

        except requests.HTTPError as e: # if HTTPS Error occured, print the error message
            print(f"HTTP Error occurred: {e}")
            return False

        except Exception as e: # if any other error occured, print the error message
            print(f"An error occurred: {e}")
            return False
    

    # create a function to get the links
    def process_page(self, url, depth):

        # apply depth threshold
        if depth > self.max_depth or url in self.visited:
            return set(), {} # return empty set and string

        self.visited.add(url) # add the visited url to the set
        links = set() # create a set to store the collected links
        page_data = {'url': url, 'content': ''}

        try:
            r = requests.get(url, timeout=10) # request the content of a url
            r.raise_for_status() # check if the request status is successful
            soup = BeautifulSoup(r.text, 'html.parser') # parse the content of the collected HTML
            
            # Extract the links
            anchors = soup.find_all('a') # find all the anchors

            for anchor in anchors: # merge the anchor with the starting url
                link = requests.compat.urljoin(url, anchor.get('href')) # get the link and join it with the starting url
                # consier proper url links ???
                links.add(link) # add the link to the previously created set
            
            # Extract the content from the url
            content = ' '.join([par.text for par in soup.find_all('p')]) # get all the text
            content =  re.sub(r'[\n\r\t]', '', content) # remove the sequence characters
            page_data['content'] = content

        except requests.RequestException: # if the request encounters an error, pass
            pass

        return links, page_data# return the set of the collected links and the contet of the current url

    def is_valid_url(self, url):
        return url.startswith('http')

    def crawl(self):
        if not self.is_successful():
            return
        
        to_crawl = [(self.start_url, 0)]
        crawled_data = []
        i = 0
        while to_crawl and i< self.max_links:
            current_url, current_depth = to_crawl.pop(0)
            if current_depth <= self.max_depth and i<50:
                links, content = self.process_page(current_url, current_depth)
                print(f'Crawled {current_url} at depth {current_depth} with {len(links)} links found.')
                crawled_data.append(content)
                i += 1
                to_crawl.extend([(link, current_depth + 1) for link in links if link not in self.visited])
        
        # Save the crawled data to a JSON file
        with open(self.output_file, 'w') as f:
            json.dump(crawled_data, f, indent=4)

                
# Example usage
crawler = WebCrawler('https://github.com/aman0046/TOP-100-DSA-Interview-Questions', max_depth=2)
crawler.crawl()

# how to make api calls 