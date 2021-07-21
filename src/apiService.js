export default class NewFindingsApi  {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
    fetchArticles() {
        const KEY = '22502202-f847ab35a707d5e3f99b1114d';
        const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${KEY}`
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            this.page += 1;
            return data.hits
        })
    }
    get query() {
        return this.searchQuery
    }
    set query(newQuery) {
        this.searchQuery = newQuery
    }
    resetPage() {
        this.page = 1;
    }
    
}