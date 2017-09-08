import Header from './components/Header.vue';
import Login from './components/Login.vue';
import Home from './components/Home.vue';
import Post from './components/Post.vue';
import Reply from './components/Reply.vue';
import Retweet from './components/Retweet.vue';
import Favorite from './components/Favorite.vue';
import Search from './components/Search.vue';
import Tweet from './components/Tweet.vue';


export const routes = [
  {path: '', components: {
    default: Header
  },
  children: [
    {path: '/login', component: Login, name: 'Login'},
    {path: '/home', component: Home, name: 'Home'},
    {path: '/post', component: Post, name: 'Post'},
    {path: '/reply', component: Reply, name: 'Reply'},
    {path: '/retweet', component: Retweet, name: 'Retweet'},
    {path: '/favorite', component: Favorite, name: 'Favorite'},
    {path: '/search', component: Search, name: 'Search'},
    {path: '/tweet/:username', component: Tweet, name: 'Tweet'}
  ]
}
];
