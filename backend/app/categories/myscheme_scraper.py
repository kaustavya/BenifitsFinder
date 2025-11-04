import requests
from bs4 import BeautifulSoup

def fetch_myscheme_schemes():
    """
    Scrape all schemes from https://www.myscheme.gov.in
    Returns a list of scheme dictionaries with title and link.
    """
    url = "https://www.myscheme.gov.in/schemes"
    response = requests.get(url)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, 'html.parser')
    schemes = []
    # This selector may need adjustment based on actual HTML structure
    for card in soup.select('.scheme-card, .views-row'):
        title_tag = card.select_one('.scheme-title, h3, a')
        link_tag = card.select_one('a')
        title = title_tag.get_text(strip=True) if title_tag else None
        link = link_tag['href'] if link_tag and link_tag.has_attr('href') else None
        if title and link:
            if not link.startswith('http'):
                link = f"https://www.myscheme.gov.in{link}"
            schemes.append({'title': title, 'link': link})
    return schemes

def save_schemes_to_resources(schemes, filepath):
    """
    Save the list of schemes to a resources file as JSON.
    """
    import json
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(schemes, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    schemes = fetch_myscheme_schemes()
    save_schemes_to_resources(schemes, '../../resources/schemes.json')
    print(f"Saved {len(schemes)} schemes to resources/schemes.json")
    for scheme in schemes:
        print(scheme)
