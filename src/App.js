import React, { Component } from 'react';
import './App.css';
import Darkmode from 'darkmode-js';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

const options = {
  bottom: '32px', // default: '32px'
  right: '32px', // default: '32px'
  left: 'unset', // default: 'unset'
  time: '0.2s', // default: '0.3s'
  mixColor: '#fff', // default: '#fff'
  backgroundColor: '#d8d3ca',  // default: '#fff'
  buttonColorDark: '#272c35',  // default: '#100f2c'
  buttonColorLight: '#fff', // default: '#fff'
  saveInCookies: true, // default: true,
  label: String.fromCodePoint(0x1F313), // default: ''
  autoMatchOsTheme: true // default: true
}

const darkmode = new Darkmode(options);

darkmode.showWidget();

class App extends Component {
  x = 50
  constructor(){
    super();

    // if (token) {
    //   spotifyApi.setAccessToken(clientToken);
    // }
    this.state = {
      // loggedIn: token ? true : false,
      list: [],
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
  componentDidMount() {
    this.getToken()
  }
  render() {
    return (
      <div className= "center-v">
        <nav>
            <ul>
                <li>
                    <a href="https://jaykudva.me">home</a>
                </li>
                <li>
                    <a href="/resume">resume</a>
                </li>
                <li>
                    <a href="https://www.youtube.com/channel/UCuKdN2q-1Cv1kJRlAPT9tIg?sub_confirmation=1">youtube</a>
                </li>
                <li>
                    <a href="https://www.linkedin.com/in/jaykudva">linkedin</a>
                </li>
                <li>
                    <a href="https://www.unsplash.com/@jaykudva">photography</a>
                </li>
                <li>
                    <a href="/list.html">previous</a>
                </li>
                <li>
                    <a href="/ten">top10</a>
                </li>
                <li>
                    <a href="/quotes">quotes</a>
                </li>
            </ul>
        </nav>
          <div className="bounds">
            <div>
              {
                this.state.list.map((song, i) => {
                  return <p><img src={song.track.album.images[0].url} style={{ height: this.x }}/> {i+1}: <a href={song.track.external_urls.spotify} target="_blank" className="ooga">{song.track.name}</a></p>
                })
              }
            </div>
            { this.state.loggedIn && <button onClick={() => this.getTenPlaylist()}>
                10
              </button>
            }
            <button  onClick={this.getToken.bind(this)}>
              Update
            </button>
          </div>
      </div>
      );
  }
}

export default App;