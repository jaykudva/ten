import React, { Component } from 'react';
import './App.css';

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class App extends Component {
  x = 50
  constructor(){
    super();

    // if (token) {
    //   spotifyApi.setAccessToken(clientToken);
    // }
    this.state = {
      // loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: '' },
      list: [],
      picsList: { p1: '', p2:'', p3: '', p4: '', p5:'',
                  p6: '', p7:'', p8: '', p9: '', p10:''}
    }
  }
  getToken() { 
    var request = require('request'); // "Request" library

    var client_id = '075f2d8dc6744629b213c8db5f197f11'; // Your client id
    var client_secret = '28379d8195194e7ab1fe758936700605'; // Your secret

    // your application requests authorization
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      form: {
        grant_type: 'client_credentials'
      },
      json: true
    };

    var self = this
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        // use the access token to access the Spotify Web API
        var token = body.access_token;
        var options = {
          url: 'https://api.spotify.com/v1/playlists/1VAF2XuY780GAeCgIsFtJz',
          headers: {
            'Authorization': 'Bearer ' + token
          },
          json: true
        };
        request.get(options, function(error, response, body) {
          self.setState({
            list: body.tracks.items
          })
        });
      }
    });
  }
  getTenPlaylist(){
    spotifyApi.getPlaylist("1VAF2XuY780GAeCgIsFtJz").then((response) => {
      
      this.setState({
        list: response.tracks.items
      })
    })
  }
  render() {
    return (
      <div className= "center-v">
        {/* <div className="App">
          <a href = "http://localhost:8888"><button > Login to Spotify</button></a>
        </div> */}
        <div>

        </div>
        <div>
          {
            this.state.list.map((song, i) => {
              return <p><img src={song.track.album.images[0].url} style={{ height: this.x }}/> {i+1}: {song.track.name}</p>
            })
          }
        </div>
        { this.state.loggedIn && <button onClick={() => this.getTenPlaylist()}>
            10
          </button>
        }
        <button  onClick={this.getToken.bind(this)}>
          get token
        </button>
      </div>
    );
  }
}

export default App;