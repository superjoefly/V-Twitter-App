// LOGIN CHECK ///////////////////////////
export const loginCheck = (state) => {

  // console.log(typeof state.oauth_verifier);
  // console.log(localStorage.getItem('oauth_token'));
  // console.log(localStorage.getItem('oauth_token_secret'));

  ///////////////////////////////////////
  // CLEAR STORAGE (for testing)
  // state.clearTokens();

  // STEP 1: Set initial state and check for token/verifier

  // Reset message class if necessary when routing back to home
  state.messageClass.isError = false;
  state.messageClass.isActive = true;

  // Clear the tweets array
  state.tweets.splice(0, state.tweets.length);

  var cb = new Codebird();
  cb.setConsumerKey(state.key, state.secret);

  // If we have verifier, execute the following:
  if (state.oauth_token && state.oauth_verifier) {

    // Set initial state
    state.modal().style.display = 'none';
    state.showHome = true;
    state.messageClass.active = true;

    // Set Tokens
    cb.setToken(localStorage.getItem('oauth_token'), localStorage.getItem('oauth_token_secret'));

    //////////////////////////////

    cb.__call(
        "oauth_accessToken",
        {
            oauth_verifier: state.oauth_verifier
        },
        function (reply, rate, err) {
            if (err) {
                console.log("error response or timeout exceeded" + err.error);
                state.showHome = false;
                state.modal().style.display = 'block';
            }

            else if (reply) {
                // Set Tokens
                cb.setToken(reply.oauth_token, reply.oauth_token_secret);

                // Save Tokens
                state.saveTokens(reply.oauth_token, reply.oauth_token_secret);

                // Save Logged In User's Screen Name
                state.saveUserName(reply.screen_name);
                location.href="/home";
            }
        }
    );

    // STEP 2: Check local storage for saved tokens
    // if we don't have them, then login

  } else {

    if (!localStorage.getItem('oauth_token') || !localStorage.getItem('oauth_token_secret')) {

      state.modal().style.display="block";
      state.showHome = false;
      state.searching = false;
      state.message = '';

      // STEP 3: If we do have the tokens, request timeline
  } else {

    cb.setToken(localStorage.getItem('oauth_token'), localStorage.getItem('oauth_token_secret'));

    state.modal().style.display="none";
    state.showHome = true;

    state.message="Searching...";
    state.searching = true;

    //////////////////////////////

      cb.__call(
        "statuses_homeTimeline",
             {},
             function (reply, rate, err) {
               state.tweets.push(...reply);
               state.searching = false;
               state.message = '';

               if (err && err.errors.length > 0) {
                 state.modal().style.display="block";
                 state.showHome = false;
               }
               else
                 {
                   if (reply && reply.errors && reply.errors.length > 0) {
                     console.log(reply.errors);
                     state.modal().style.display="block";
                     state.showHome = false;
                   } else {
                     console.log('SUCCESS!');
                   }
                 }

             }
         );
  }
  // Set ScreenName
  state.loggedInUser = localStorage.getItem('screen_name');
  }
};



// SIGN IN //////////////////////////
export const signIn = (state) => {
  event.preventDefault();

  var cb = new Codebird();
  cb.setConsumerKey(state.key, state.secret);

  //////////////////////////////

  // gets a request token
  cb.__call(
      "oauth_requestToken",
      {oauth_callback: "http://localhost:8080/home"},
      function (reply,rate,err) {
          if (err) {
              console.log("error response or timeout exceeded" + err.error);
          }
          if (reply) {
              // stores it
              cb.setToken(reply.oauth_token, reply.oauth_token_secret);

              // // SAVE TOKENS
              state.saveTokens(reply.oauth_token, reply.oauth_token_secret);

              // gets the authorize screen URL
              cb.__call(
                  "oauth_authorize",
                  {},
                  function (auth_url) {
                      location.href = auth_url;
                  }
              );
          }
      }
  );
};

// SEARCH TWITTER /////////////////////////////
export const search = (state) => {

  var cb = new Codebird();
  cb.setConsumerKey(state.key, state.secret);

  state.tweets.splice(0, state.tweets.length);
  // Hide Clear Button
  state.isResults = false;

  // If no term entered display a message
  if (state.term === '') {

    // Change message
    state.message = "Please enter a search term!";

    // Change color of message
    state.messageClass.isActive = false;
    state.messageClass.isError = true;

  // If there is a search term, execute the following
  } else {

  ////////////////////////////
  cb.__call(
      "search_tweets",
      "q=" + state.term,
      function (reply) {
        // This code executes AFTER the results are returned (callback)
        state.tweets = reply.statuses;
        console.log(state.tweets);

        // Hide Animation
        state.searching = false;

        // Add @ symbol to screen names
        state.tweets.forEach(function(tweet) {
          tweet.user.screen_name = '@' + tweet.user.screen_name;
        });

        // If there are results
        if (state.tweets.length > 0) {
          state.message = '';
          state.isResults = true;
        } else {
          state.message = 'Sorry, no results...';
        }
      },
      true // this parameter required
  );

  // This code executes BEFORE the results of the call are returned
  state.term = '';
  state.messageClass.isActive = true;
  state.message = 'Searching...';
  state.searching = true;

}

};

// So we can use v-model on the 'term' property
export const updateTerm = (state, payload) => {
  state.term = payload;
};




// GET TWEET ///////////////////////////////
// Payload is the 'tweet' that was clicked
export const getTweet = (state, payload) => {
  state.selectedTweet = payload;
  console.log(state.selectedTweet);

  // Check if authenticating user is author of post
  if (state.selectedTweet.user.screen_name == localStorage.getItem('screen_name')) {
    state.remove = true;
  } else {
    state.remove = false;
  }

  // Check if currently following author
  if (state.selectedTweet.user.following) {
    state.following = true;
    state.title = 'Unfollow?';
  } else {
    state.following = false;
    state.title = 'Follow?';
  }

  // // Convert Date to UTC (For Reference)
  // state.selectedPostDate = new Date(Date.parse(state.selectedPostDate.replace(/(\+)/,'UTC$1')));
};

// Clear the results and remove 'clear' button
export const clearResults = (state) => {
  state.tweets.splice(0, state.tweets.length);
  state.isResults = false;
};




// DATE DIFF //////////////////////////////
export const dateDiff = (state) => {

  // Return new instance of date object
  let dt1 = new Date(state.selectedTweet.created_at);

  // Get current date
  let dt2 = new Date();

  // Convert to milliseconds
  let utc1 = Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate(), dt1.getUTCHours(), dt1.getUTCMinutes(), dt1.getUTCSeconds());

  let utc2 = Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate(), dt2.getUTCHours(), dt2.getUTCMinutes(), dt2.getUTCSeconds());

  // Get difference of two dates
  let result = (utc2 - utc1) / (1000 * 60 * 60 * 24);

  // console.log(result);

  // Round down to lowest integer
  let floor = Math.floor(result);
  // console.log(floor);

  // Nested If Statements
  // If 'floor' is greater than zero, define result
  // Else multiply result, floor result, and continue check...
  if (floor > 0) {
    result = floor + ' days';
  } else {
    result *= 24;
    floor = Math.floor(result);
    if (floor > 0) {
      result = floor + ' hrs';
    } else {
      result *= 60;
      floor = Math.floor(result);
      if (floor > 0) {
        result = floor + ' mins';
      } else {
        result *= 60;
        floor = Math.floor(result);
        if (floor > 0) {
          result = floor + ' secs';
        }
      }
    }
  }
  state.timeResult = result;
};



export const removePlaceholder = (state) => {
  state.placeholder = '';
  state.message = '';
};
export const showPlaceholder = (state) => {
  state.placeholder = 'Please, enter a topic...';
};



export const login = (state) => {
  state.modal().style.display="block";
  state.needLogin = false;
  state.loginMessage = '';
};

export const cancel = (state) => {
  state.modal().style.display="none";
  state.searching = false;
  state.loginMessage = 'You must login to view and search tweets!';
  state.needLogin = true;
};

// LOGOUT ////////////////////////////////
export const logOut = (state) => {
  if (state.showHome == true) {
    if (confirm('Log out of Twitter?')) {
      var cb = new Codebird();
      cb.logout();
      state.clearTokens();
      location.href="/home";
      console.log('logged out!');
    }
  }
};




// POST TO TWITTER ///////////////////////
export const goPost = (state, payload) => {
  // Payload is the router
  payload.push({name: 'Post'});
  state.message = '';
};

export const setPost = (state, payload) => {
  state.postText = payload;
};




export const post = (state) => {
  var cb = new Codebird();
  cb.setConsumerKey(state.key, state.secret);

  if((state.selectedImage === null) && (state.postText === '')) {
    state.messageClass.isActive = false;
    state.messageClass.isError = true;
    // state.message = 'Please enter a tweet or pick an image to upload!';
    state.message = 'Please enter some text to post a tweet!';

  } else {
    // var params = {
    //   "media_data": state.selectedImage
    // };

    cb.setToken(localStorage.getItem('oauth_token'), localStorage.getItem('oauth_token_secret'));

    // cb.__call(
    //   "media_upload",
    //   params,
    //   function(reply, rate, err) {
    //     // Callback...
    //       console.log(reply.media_id_string);

            cb.__call(
                "statuses_update",
                {
                  // "media_ids" : "mediaID1, mediaID2"
                  "status": state.postText
                },
                function (reply, rate, err) {
                    if (err) {
                      console.log(err);
                      state.message = 'Could not send tweet!';
                      state.messageClass.isError = true;
                    } else {
                      console.log(reply);
                      state.message = 'Tweet sent!';
                      state.messageClass.isActive = true;
                      state.tweetSent = true;
                    }
                }
            );
            // Executed before callback
            state.postText = '';
            state.messageClass.isActive = true;
            state.message = 'Posting...';
      // }
    // );

  }

  // if (state.postText === '') {
  //   event.preventDefault();
  //   state.message = "Please, enter some text into the text area to post...";
  //   state.messageClass.isError = true;
  //   state.messageClass.isActive = false;
  // } else {
  //
  //
  // cb.setToken(localStorage.getItem('oauth_token'), localStorage.getItem('oauth_token_secret'));
  //
  //   cb.__call(
  //       "statuses_update",
  //       {
  //         // "media_ids" : "mediaID1, mediaID2"
  //         "status": state.postText
  //       },
  //       function (reply, rate, err) {
  //           if (err) {
  //             console.log(err);
  //             state.message = 'Could not send tweet!';
  //             state.messageClass.isError = true;
  //           } else {
  //             console.log(reply);
  //             state.message = 'Tweet sent!';
  //             state.messageClass.isActive = true;
  //           }
  //       }
  //   );
  //   // Executed before callback
  //   state.postText = '';
  //   state.messageClass.isActive = true;
  //   state.message = 'Posting...';
  // }
};



// UNPOST ////////////////////////////////
export const unPost = (state) => {
  var cb = new Codebird();
  cb.setConsumerKey(state.key, state.secret);

  cb.setToken(localStorage.getItem('oauth_token'), localStorage.getItem('oauth_token_secret'));

    cb.__call(
        "statuses_destroy_ID", 'id='+ state.selectedTweet.id_str,
        function (reply, rate, err) {
            if (err) {
              console.log(err);
              state.message = 'Could not remove tweet!';
            } else {
              console.log(reply);
              state.message = 'Tweet removed!';
              state.remove = false;

              // Remove selectedTweet from tweets
              // Get the position of selectedTweet
              let position = state.tweets.indexOf(state.selectedTweet);
              // If the tweet exists, then remove it
              if (~position) state.tweets.splice(position, 1);
            }
        }
    );
};



// REPLY //////////////////////////////
export const setReply = (state, payload) => {
  state.replyText = payload;
};

export const reply = (state) => {
  var cb = new Codebird();
  cb.setConsumerKey(state.key, state.secret);

  state.screenName = '@' + state.selectedTweet.user.screen_name;

  // for reference
  // filters.selectedTweetScreenNameFilter(state.selectedTweet)

  if (state.replyText === '') {
    event.preventDefault();
    state.message = "Please, enter some text into the text area to post...";
    state.messageClass.isError = true;
    state.messageClass.isActive = false;
  } else {

  cb.setToken(localStorage.getItem('oauth_token'), localStorage.getItem('oauth_token_secret'));

    cb.__call(
        "statuses_update",
        {"status": state.screenName + ' ' + state.replyText, "in_reply_to_status_id": state.selectedTweet.id_str},
        function (reply, rate, err) {
            if (err) {
              console.log(err);
              state.message = 'Could not send tweet!';
              state.messageClass.isError = true;
            } else {
              console.log(reply);
              state.message = 'Reply sent!';
              state.messageClass.isActive = true;
              state.tweetSent = true;
            }
        }
    );

    // Executed before callback
    state.replyText = '';
    state.message = 'Replying...';
    state.messageClass.isActive = true;
  }
};



// RETWEET ////////////////////////////////

export const retweet = (state) => {
  var cb = new Codebird();
  cb.setConsumerKey(state.key, state.secret);

  cb.setToken(localStorage.getItem('oauth_token'), localStorage.getItem('oauth_token_secret'));

    cb.__call(
      "statuses_retweet_ID", 'id='+ state.selectedTweet.id_str,
        function (reply, rate, err) {
            if (err) {
              console.log(err);
              state.message = 'Could not retweet!';
            } else {
              console.log(reply);
              state.message = 'Retweet sent!';
              state.tweetSent = true;
              state.selectedTweet.retweeted = true;
            }
        }
    );
  };



  // UNRETWEET ///////////////////////////////
export const unRetweet = (state) => {
    var cb = new Codebird();
    cb.setConsumerKey(state.key, state.secret);

    cb.setToken(localStorage.getItem('oauth_token'), localStorage.getItem('oauth_token_secret'));

      cb.__call(
        "statuses_unretweet_ID", 'id='+ state.selectedTweet.id_str,
          function (reply, rate, err) {
              if (err) {
                console.log(err);
                state.message = 'Could not undo retweet!';
              } else {
                console.log(reply);
                state.message = 'Retweet removed!';
                state.tweetSent = true;
                state.selectedTweet.retweeted = false;
              }
          }
      );
  };



  // FAVORITE //////////////////////////////////
export const favorite = (state) => {
  var cb = new Codebird();
  cb.setConsumerKey(state.key, state.secret);

  cb.setToken(localStorage.getItem('oauth_token'), localStorage.getItem('oauth_token_secret'));

    cb.__call(
      "favorites_create", 'id='+ state.selectedTweet.id_str,
        function (reply, rate, err) {
            if (err) {
              console.log(err);
              state.message = 'Could not favorite!';
            } else {
              console.log(reply);
              state.message = 'Tweet has been favorited!';
              state.selectedTweet.favorited = true;
              state.tweetSent = true;
            }
        }
    );
  };



  // UNFAVORITE /////////////////////////////////
export const unFavorite = (state) => {
    var cb = new Codebird();
  cb.setConsumerKey(state.key, state.secret);

    cb.setToken(localStorage.getItem('oauth_token'), localStorage.getItem('oauth_token_secret'));

      cb.__call(
        "favorites_destroy", 'id='+ state.selectedTweet.id_str,
          function (reply, rate, err) {
              if (err) {
                console.log(err);
                state.message = 'Could not unfavorite!';
              } else {
                console.log(reply);
                state.message = 'Tweet has been unfavorited!';
                state.selectedTweet.favorited = false;
              }
          }
      );
  };



  // FOLLOW //////////////////////////////////////
export const follow = (state) => {
   var cb = new Codebird();
  cb.setConsumerKey(state.key, state.secret);

    cb.setToken(localStorage.getItem('oauth_token'), localStorage.getItem('oauth_token_secret'));

    // Toggle the follow button
    state.following = !state.following;

    if (!state.selectedTweet.user.following) {
      cb.__call(
        "friendships_create",'screen_name='+ state.selectedTweet.user.screen_name,
          function (reply, rate, err) {
              if (err) {
                console.log(err);
                state.message = 'Unable to follow!';
                state.following = false;
              } else {
                console.log(reply);
                state.message = 'Following!';
                // state.following = true;
                state.selectedTweet.user.following = true;
              }
          }
      );
    } else {
      // UNFOLLOW //////////////////////////////////
      console.log('Call to unfollow!');
      cb.__call(
        "friendships_destroy",'screen_name='+ state.selectedTweet.user.screen_name,
          function (reply, rate, err) {
              if (err) {
                console.log(err);
                state.message = 'Unable to unfollow!';
                state.following = true;
              } else {
                console.log(reply);
                state.message = 'Unfollowed!';
                // state.following = false;
                state.selectedTweet.user.following = false;
              }
          }
      );
    }
  };
