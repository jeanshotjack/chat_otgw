import { put, takeEvery } from 'redux-saga/effects';

import { messagesLoaded } from '../actions';

const delay = (ms) => new Promise(res => setTimeout(res, ms));

const conversations = [
    { 
        id: '1',
        imageUrl: require('../../images/profiles/wirt.jpg'),
        imageAlt: 'Wirt',
        title: 'Wirt • jason_f_hate_acct@gmail.com • (212) 555-5555',
        createdAt: 'October 31',
        latestMessageText: 'This is a message',
        messages: [
            {
                imageUrl: null,
                imageAlt: null,
                messageText: 'This is a message',
                createdAt: 'Apr 31',
                isMyMessage: true
            },
            {
                imageUrl: require('../../images/profiles/wirt.jpg'),
                imageAlt: 'Wirt',
                messageText: `
                    Why not?
                `,
                createdAt: 'Apr 16',
                isMyMessage: false
            },
            {
                imageUrl: null,
                imageAlt: null,
                messageText: 'Maybe you should not trust Beatrice... ',
                createdAt: 'Apr 15',
                isMyMessage: true
            },
            {
                imageUrl: require('../../images/profiles/wirt.jpg'),
                imageAlt: 'Wirt',
                messageText: `
                    He embarassed me in front of Sara and now I definitely can't compete with Jason Funderberker. 
                    And now I can't find him and the Beast is going to kill him and Beatrice isn't helping.
                `,
                createdAt: 'Apr 15',
                isMyMessage: false
            },
            {
                imageUrl: null,
                imageAlt: null,
                messageText: `
                    How is it Greg's fault?
                `,
                createdAt: 'Apr 15',
                isMyMessage: true
            },
            {
                imageUrl: require('../../images/profiles/wirt.jpg'),
                imageAlt: 'Wirt',
                messageText: `
                    Greg got us lost in the woods and now we can't get home.
                `,
                createdAt: 'Apr 15',
                isMyMessage: false
            },
            {
                imageUrl: null,
                imageAlt: null,
                messageText: 'Are you okay?',
                createdAt: 'Apr 13',
                isMyMessage: true
            },
            {
                imageUrl: require('../../images/profiles/wirt.jpg'),
                imageAlt: 'Wirt',
                messageText: '...Hey?',
                createdAt: 'Apr 13',
                isMyMessage: false
            },
            {
                imageUrl: null,
                imageAlt: null,
                messageText: 'Hey Wirt?',
                createdAt: 'Apr 13',
                isMyMessage: true
            }
        ]
    },
    {
        id: '2', 
        imageUrl: require('../../images/profiles/greg.png'),
        imageAlt: 'Greg',
        title: 'Greg • ilovefrogs@gmail.com • (212) 555-5525',
        createdAt: 'Oct 20',
        latestMessageText: 'The Beast?',
        messages: []
    },
    {
        id: '3', 
        imageUrl: require('../../images/profiles/woodsman.png'),
        imageAlt: 'Woodsman',
        title: 'Woodsman • lightmyfire@gmail.com • (123) 555-5523',
        createdAt: '1 week ago',
        latestMessageText: 'As long as I do not let my lantern go out...',
        messages: []
    },
    { 
        id: '4',
        imageUrl: require('../../images/profiles/beatrice.jpg'),
        imageAlt: 'Beatrice',
        title: 'Beatrice • gavemewings@gmail.com • (123) 555-4345',
        createdAt: '2:49 PM',
        latestMessageText: 'We need to get to Adelaide',
        messages: []
    },
    { 
        id: '5',
        imageUrl: require('../../images/profiles/thebeast.png'),
        imageAlt: 'the Beast',
        title: 'the Beast • edelwoodsoul@gmail.com • (123) 456-7890',
        createdAt: '6:14 PM',
        latestMessageText: 'Keep that Dark Lantern burning, Woodsman',
        messages: []
    },
    { 
        id: '6',
        imageUrl: require('../../images/profiles/thefrog.png'),
        imageAlt: 'the Frog',
        title: 'the Frog • jazzman@gmail.com • (123) 555-9876',
        createdAt: '3 secs ago',
        latestMessageText: 'At night when the lake is a mirror and the moon rides the waves to the shore',
        messages: []
    },
    { 
        id: '7',
        imageUrl: require('../../images/profiles/sara.png'),
        imageAlt: 'Sara',
        title: 'Sara • jmascot@gmail.com • (212) 555-5735',
        createdAt: '30 mins ago',
        latestMessageText: 'Awesome!!! Congratulations!!!!',
        messages: []
    },
    { 
        id: '8',
        imageUrl: require('../../images/profiles/jason.png'),
        imageAlt: 'Jason Funderberker',
        title: 'Jason Funderberker • tinyeyes@gmail.com • (212) 555-1010',
        createdAt: '1 week ago',
        latestMessageText: 'uhhhhh',
        messages: []
    },
    { 
        id: '9',
        imageUrl: require('../../images/profiles/whispers.png'),
        imageAlt: 'Auntie Whispers',
        title: 'Auntie Whispers • timcurry@gmail.com • (123) 555-2020',
        createdAt: '1 year ago',
        latestMessageText: 'I love turtles.',
        messages: []
    }
];

export const conversationsSaga = function*() {
    yield delay(1000);
    yield put(messagesLoaded(conversations[0].id, conversations[0].messages, false, null));

    yield put({
        type: 'CONVERSATIONS_LOADED',
        payload: {
            conversations,
            selectedConversation: conversations[0]
        }
    });
}

export function* watchGetConversationsAsync() {
    yield takeEvery('CONVERSATIONS_REQUESTED', conversationsSaga);
}