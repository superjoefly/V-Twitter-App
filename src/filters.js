import moment from 'moment';

var filters = {};

  filters.nameFilter = function(tweet) {
    return tweet.retweeted_status ? tweet.retweeted_status.user.name : tweet.user.name;
  };

  filters.imageFilter = function(tweet) {
    var imgurl = tweet.retweeted_status ? tweet.retweeted_status.user.profile_image_url : tweet.user.profile_image_url;
    return imgurl;
  };

  filters.screenNameFilter = function(tweet) {
    return tweet.retweeted_status ? tweet.retweeted_status.user.screen_name + ` (retweeted by ${tweet.user.screen_name})`: tweet.user.screen_name;
  };

  filters.textFilter = function(tweet) {
    return tweet.retweeted_status ? tweet.retweeted_status.text : tweet.text;
  };

  filters.createdAtFilter = function(tweet) {
    // return tweet.retweeted_status ? tweet.retweeted_status.created_at : tweet.created_at;

    return tweet.retweeted_status ? moment(tweet.retweeted_status.created_at, 'ddd MMM DD HH:mm:ss ZZ YYYY').toString() : moment(tweet.created_at, 'ddd MMM DD HH:mm:ss ZZ YYYY').toString();
  };

  filters.selectedTweetNameFilter = function(selectedTweet) {
    return selectedTweet.retweeted_status ? selectedTweet.retweeted_status.user.name
    : selectedTweet.user.name;
  };

  filters.selectedTweetImageFilter = function(selectedTweet) {
    return selectedTweet.retweeted_status ? selectedTweet.retweeted_status.user.profile_image_url : selectedTweet.user.profile_image_url;
  };

  filters.selectedTweetTextFilter = function(selectedTweet) {
    return selectedTweet.retweeted_status ? selectedTweet.retweeted_status.text : selectedTweet.text;
  };

  filters.selectedTweetMediaFilter = function(selectedTweet) {
    return selectedTweet.extended_entities.media[0].media_url;
  };

  filters.selectedTweetScreenNameFilter = function(selectedTweet) {
    return selectedTweet.retweeted_status ? '@' + selectedTweet.retweeted_status.user.screen_name + ' @' + selectedTweet.user.screen_name: '@' + selectedTweet.user.screen_name;
  };

export default filters;
