import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getSpotifyURI, setPlayerState } from '../actions';
import hello from 'hellojs';
import SongPlayer from './SongPlayer';

class SetListSong extends Component {

  getSongData(key) {

    return this.props.setLists
      [this.props.setListID]
      .songLists
      [this.props.isEncore?'encore':'main']
      [this.props.songID]
      [key];

  }

  getSpotifyURI() {

    this.props.getSpotifyURI({
      artistName: this.props.artistName,
      songName: this.getSongData('songName'),
      isEncore: this.props.isEncore,
      setListID: this.props.setListID,
      songID: this.props.songID
    });

  }

  componentWillMount() {

    if(!this.getSongData('spotifyURI')) {
      this.getSpotifyURI();
    }

  }

  handleSongClick() {

    this.togglePlayer();

  }

  togglePlayer() {


    if(this.props.playerState &&
       this.props.playerState.setListID === this.props.setListID &&
       this.props.playerState.songID === this.props.songID)
    {

      this.props.setPlayerState(false);

    } else {

      this.props.setPlayerState({
        setListID: this.props.setListID,
        songID: this.props.songID
      });

    }

  }

  render() {

    let styles = {
      'greyedOut': {
        'color': '#b1b1b1'
      }
    }

    return(
      <div>
        {
          this.getSongData('spotifyURI') === false ?
            <p style={styles.greyedOut}>{ this.getSongData('songName') } (Unavailable)</p> :
            <p onClick={this.handleSongClick.bind(this)}>{ this.getSongData('songName') }</p>
        }


        {
          this.props.playerState &&
          this.props.playerState.setListID === this.props.setListID &&
          this.props.playerState.songID === this.props.songID
          ? <SongPlayer spotifyURI={ this.getSongData('spotifyURI') } /> : ''
        }

      </div>
    )

  }

}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
    getSpotifyURI,
    setPlayerState
  }, dispatch);
}

const mapStateToProps = (state) => {
  return {
    artistName: state.appState.artistName,
    setLists: state.appState.setLists,
    playerState: state.appState.playerState
  }
}

SetListSong = connect(mapStateToProps, mapDispatchToProps)(SetListSong);

export default SetListSong;