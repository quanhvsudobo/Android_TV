import QueryString from './querystring';
import store from './store.js';
import Codebird from './codebird';

var twitter = {};
var cb = new Codebird;
twitter.cb = cb;

// ADD YOUR KEYS HERE! If you have none, go to https://apps.twitter.com and generate them!
cb.setConsumerKey("XpIvxPsGknYOk8N8RZnKxq7hc", "cyAoh4cYBk33Rn0Ixeho1qv76XmYJN3LX3W2qLQla266FiKF0e");

var oauth_token = QueryString.oauth_token;
var oauth_verifier = QueryString.oauth_verifier;
// localStorage.clear();

function saveTokens(oauth_token, oauth_token_secret) {
    localStorage.setItem('oauth_token', oauth_token);
    localStorage.setItem('oauth_token_secret', oauth_token_secret);
}

if (oauth_token && oauth_verifier) {
    cb.setToken(localStorage.getItem('oauth_token'), localStorage.getItem('oauth_token_secret'));

    cb.__call(
        "oauth_accessToken",
        {
            oauth_verifier: oauth_verifier
        },
        function (reply, rate, err) {
            if (err) {
                console.log("error response or timeout exceeded" + err.error);
                window.f7.loginScreen();
            }
            else if (reply) {
                console.log("oauth_accessToken: " + reply);
                cb.setToken(reply.oauth_token, reply.oauth_token_secret);
                saveTokens(reply.oauth_token, reply.oauth_token_secret);
                // location.href = "/";
            }
        }
    );
}
else {
    
    if (!localStorage.getItem('oauth_token') || !localStorage.getItem('oauth_token_secret')) {
        document.addEventListener('DOMContentLoaded', () => { window.f7.loginScreen(); });
    }
    else {
        cb.setToken(localStorage.getItem('oauth_token'), localStorage.getItem('oauth_token_secret'));
        // cb.__call(
        //     "statuses_homeTimeline",
        //     {},
        //     function (reply, rate, err) {
        //         store.tweets.length = 0;
        //         store.tweets.push(...reply);
        //     }
        // );
    }
}

twitter.login = function () {
    cb.__call(
        "oauth_requestToken",
        { oauth_callback: "http://localhost:8080/twitter/callback" },
        function (reply, rate, err) {
            if (err) {
                console.log("error response or timeout exceeded" + err.error);
            }
            if (reply) {
                console.log("reply.oauth_token" + reply.oauth_token);
                console.log("reply.oauth_token_secret" + reply.oauth_token_secret);
                cb.setToken(reply.oauth_token, reply.oauth_token_secret);
                saveTokens(reply.oauth_token, reply.oauth_token_secret);

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
}

twitter.home_timeline = function (data) {
    cb.__call(
        "statuses/home_timeline",
        {},
        function (reply, rate, err) {
            if (err) {
                console.log("error response or timeout exceeded" + err.error);
            }
            if (reply) {
                store.tweets.length = 0;
                store.tweets.push(...reply);
            }
        }
    );
}

twitter.logout = function () {
  localStorage.removeItem('oauth_verifier');
  store.tweets.length = 0;
}

export default twitter;
