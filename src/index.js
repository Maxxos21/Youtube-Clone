import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bars';
import VideoList from './components/video_list';
import VideoDetail from './components/video_details';
import YTSearch from 'youtube-api-search';
import { Component } from 'react/lib/ReactIsomorphic';
import { render } from 'react-dom';
import _from from 'lodash';

const API_KEY = 'Your API Key here';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            videos: [],
            selectedVideo: null
        };

        this.VideoSearch('');
    }

    VideoSearch(term) {
        YTSearch({key: API_KEY, term: term }, (videos) => {
            this.setState({ 
                videos: videos,
                selectedVideo: videos[0]
             });
        });
    }

    render() {
        const videoSearch = _.debounce((term) => { this.VideoSearch(term) }, 300);

        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch}/>
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList 
                onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                videos={this.state.videos} />
            </div>
        );
    }
    
}


ReactDOM.render(<App />, document.querySelector('.container'));