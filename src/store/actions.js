export const removePlaceholder = ({commit}) => {
  commit('removePlaceholder');
};

export const showPlaceholder = ({commit}) => {
  commit('showPlaceholder');
};

export const search = ({commit}) => {
  commit('search');
};

export const getTweet = ({commit}, payload) => {
  commit('getTweet', payload);
  commit('dateDiff');
};

export const updateTerm = ({commit}) => {
  commit('updateTerm');
};

export const clearResults = ({commit}) => {
  commit('clearResults');
};

export const loginCheck = ({commit}) => {
  commit('loginCheck');
};

export const cancel = ({commit}) => {
  commit('cancel');
};

export const login = ({commit}) => {
  commit('login');
};

export const signIn = ({commit}) => {
  commit('signIn');
};

export const logOut = ({commit}) => {
  commit('logOut');
};

export const goPost = ({commit}, payload) => {
  commit('goPost', payload);
};

export const post = ({commit}) => {
  commit('post');
};

export const unPost = ({commit}) => {
  commit('unPost');
};

export const reply = ({commit}) => {
  commit('reply');
};

export const retweet = ({commit}) => {
  commit('retweet');
};

export const unRetweet = ({commit}) => {
  commit('unRetweet');
};

export const favorite = ({commit}) => {
  commit('favorite');
};

export const unFavorite = ({commit}) => {
  commit('unFavorite');
};

export const follow = ({commit}) => {
  commit('follow');
};
