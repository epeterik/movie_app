import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'


//API Key from omdbapi 
//  Site: http://www.omdbapi.com/
//  Send all requests to: http://www.omdbapi.com/?apikey=[yourkey]&
const APIKey = "f8de95fd";

class MovieForm extends React.Component {
  constructor(props)
  {
      super(props);
      this.state = {
        movieInputValue: "",
        movieLookupResponseData: {}
      };

      this.searchMovieDatabase = this.searchMovieDatabase.bind(this);
      this.movieLookupSuccess = this.movieLookupSuccess.bind(this);
      this.updateMovieDataState = this.updateMovieDataState.bind(this);
      this.handleMovieInput = this.handleMovieInput.bind(this);
      this.movieLookupError = this.movieLookupError.bind(this);
    }

    movieLookupSuccess() {
      console.log("Entering movieLookupSuccess"); //debug
      console.log(this.state.movieLookupResponseData.Response);
      console.log(this.state.movieLookupResponseData.Error);
      console.log(this.movieLookupResponseData);

      if (this.state.movieInputValue === "" &&
          this.state.movieLookupResponseData['Response'] === undefined)
      {
        console.log("movieLookupSuccess - Initial State"); //debug
        
        return (
          <div className="singleMovieResponseLineStyle">Please enter a movie title to lookup</div>
        );

      }
      else if (this.state.movieLookupResponseData['Response'] === "True")
      {
        console.log("movieLookupSuccess - Success"); //debug
        return (
          <div id="outputRow" key="outputRow" >
            <div id="yearRow" key="yearRow" className="singleMovieResponseLineStyle movieDataResponseStyle">
              <b>Year: </b>{this.state.movieLookupResponseData['Year']}
            </div>
            <div id="directorRow" key="directorRow" className="singleMovieResponseLineStyle movieDataResponseStyle">
              <b>Director: </b>{this.state.movieLookupResponseData['Director']}
            </div>
            <div id="plotRow" key="plotRow" className="singleMovieResponseLineStyle movieDataResponseStyle">
              <b>Plot: </b>{this.state.movieLookupResponseData['Plot']}
            </div>
          </div>
        );
      }
      else if (this.state.movieLookupResponseData['Response'] === "False")
      {
        //made it here, so something went wrong
        console.log("movieLookupSuccess - Error"); //debug
        return (
          <div className="singleMovieResponseLineStyle errorResponseStyle">{this.state.movieLookupResponseData['Error']}</div>
        );
      }
      else //the user is currently typing, clear movie entry line
      {
        //made it here, so something went wrong
        console.log("movieLookupSuccess - Clear Line"); //debug
        return (
          <div>&nbsp;</div>
        );
      }

      //console.log("Leaving movieLookupSuccess"); //debug
    }

    movieLookupError(error) {
      console.log("Entering movieLookupError");
      console.log(error);
      console.log("Leaving movieLookupError");
    }

    updateMovieDataState(response) {
      console.log("Entering updateMovieDataState");
      console.log(response.data); 
      console.log(response.status); 
      console.log(response);

      this.setState({movieLookupResponseData: response.data});

      console.log("Leaving updateMovieDataState");
    }

    handleMovieInput(event) {
      //console.log("Entering handleMovieInput"); //debug

      //var
      let localMovieInputValue = event.target.value;

      //update state
      this.setState({movieInputValue: localMovieInputValue})

      //console.log("Leaving handleMovieInput"); //debug
    }

    searchMovieDatabase() {
      console.log("Entering searchMovieDatabase()");
  
      //var
      let ombPromoise;

      //basic validation - may improve/change if time permits
      if (this.state.movieInputValue.trim() === "")
      {
        alert("Please enter a movie title to search for.");
        return;
      }
  
      //Axios API - https://www.npmjs.com/package/axios
      //            http://codeheaven.io/how-to-use-axios-as-your-http-client/ 
      //alert("button clicked");
  
      //query to be used to get all movies that satisfy search
      /*axios.get('http://www.omdbapi.com/?apikey=' + APIKey + "&s='Terminator'&page=1")
      .then(function(response){
        console.log(response.data); // ex.: { user: 'Your User'}
        console.log(response.status); // ex.: 200
      });  */

      let queryString = "http://www.omdbapi.com/?apikey=" + APIKey + "&t='" + this.state.movieInputValue + "'&plot='full'";
      
      //single movie return query
      ombPromoise = axios.get(queryString);

      //If call was successful
      ombPromoise.then(this.updateMovieDataState);

      //If call encountered an error... 
      ombPromoise.catch(this.movieLookupError);
  
      console.log("Leaving searchMovieDatabase()");
    }

    render() {

      return (
        <div id="mainBody">
          <div className="headerTitleStyle">Movie Data</div>
          <div id="movieLookup" className="movieLookup">
            <div id="searchRow" key="searchRow" className="searchRowStyle">
              <div className="textInputStyle">
                <input type="text" value={this.state.movieInputValue} onChange={this.handleMovieInput} placeholder="movie search" className="movieInputStyle" />
              </div>
              <div className="buttonInputStyle">
                <button onClick={this.searchMovieDatabase} className="shadowButton" >Search</button>
              </div>
            </div>

            {this.movieLookupSuccess()}
          </div>
        </div>
      ); //end return()

    } //end Render()

  } //end MovieForm()

class App extends Component {

  render() {

    return (
      <div className="App">
        <MovieForm />
      </div>
    ); //end return()

  } //end Render()

} //end App class

export default App;
