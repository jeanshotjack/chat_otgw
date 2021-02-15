import { put, takeLatest } from 'redux-saga/effects';

import { messagesLoaded } from '../actions';

const messageDetails = {
    '2': [
        {
            id: '1',
            imageUrl: null,
            imageAlt: null,
            messageText: 'The Beast?',
            createdAt: 'Oct 20',
            isMyMessage: true
        },
        {
            id: '2',
            imageUrl: require('../../images/profiles/greg.png'),
            imageAlt: 'Greg',
            messageText: `
                I'm going to save my brother Wirt from the Beast! .
            `,
            createdAt: 'Oct 20',
            isMyMessage: false
        },
        {
            id: '3',
            imageUrl: null,
            imageAlt: null,
            messageText: 'Why are you in the woods alone?',
            createdAt: 'Oct 19',
            isMyMessage: true
        },
        {
            id: '4',
            imageUrl: require('../../images/profiles/greg.png'),
            imageAlt: 'Greg',
            messageText: `
                I'm an elephant! Look at my teapot hat! It's a trunk! 
            `,
            createdAt: 'Oct 19',
            isMyMessage: false
        },
        {
            id: '5',
            imageUrl: null,
            imageAlt: null,
            messageText: `
                What are you supposed to be? 
            `,
            createdAt: 'Oct 19',
            isMyMessage: true
        },
        {
            id: '6',
            imageUrl: require('../../images/profiles/greg.png'),
            imageAlt: 'Greg',
            messageText: `
                Do you like my costume? 
            `,
            createdAt: 'Oct 19',
            isMyMessage: false
        },
        {
            id: '7',
            imageUrl: null,
            imageAlt: null,
            messageText: 'No Greg, I do not.',
            createdAt: 'Oct 19',
            isMyMessage: true
        },
        {
            id: '8',
            imageUrl: require('../../images/profiles/greg.png'),
            imageAlt: 'Greg',
            messageText: 'Hey! Do you have candy? ',
            createdAt: 'Oct 19',
            isMyMessage: false
        },
        {
            id: '9',
            imageUrl: null,
            imageAlt: null,
            messageText: 'Hey Greg?',
            createdAt: 'Oct 19',
            isMyMessage: true
        }
    ],
    '3': [
        {
            id: '1',
            imageUrl: null,
            imageAlt: null,
            messageText: 'Hey',
            createdAt: '1 week ago',
            isMyMessage: true
        }
    ],
    '4': [
        {
            id: '1',
            imageUrl: null,
            imageAlt: null,
            messageText: 'Hey',
            createdAt: '1 week ago',
            isMyMessage: true
        }
    ],
    '5': [
        {
            id: '1',
            imageUrl: null,
            imageAlt: null,
            messageText: 'Hey',
            createdAt: '1 week ago',
            isMyMessage: true
        }
    ],
    '6': [
        {
            id: '1',
            imageUrl: null,
            imageAlt: null,
            messageText: 'Hey',
            createdAt: '1 week ago',
            isMyMessage: true
        }
    ],
    '7': [
        {
            id: '1',
            imageUrl: null,
            imageAlt: null,
            messageText: 'Hey',
            createdAt: '1 week ago',
            isMyMessage: true
        }
    ],
    '8': [
        {
            id: '1',
            imageUrl: null,
            imageAlt: null,
            messageText: 'Hey',
            createdAt: '1 week ago',
            isMyMessage: true
        }
    ],
    '9': [
        {
            id: '1',
            imageUrl: null,
            imageAlt: null,
            messageText: 'Hey',
            createdAt: '1 week ago',
            isMyMessage: true
        }
    ]
};

const delay = (ms) => new Promise(res => setTimeout(res, ms));

const messagesSaga = function*(action) {
    const { conversationId, numberOfMessages, lastMessageId } = action.payload;
    const messages = messageDetails[conversationId];
    const startIndex = lastMessageId ? messages.findIndex(message => message.id === lastMessageId) + 1: 0;
    const endIndex = startIndex + numberOfMessages;
    const pageGroup = messages.slice(startIndex, endIndex);
    const newLastMessageId = pageGroup.length > 0 ? pageGroup[pageGroup.length - 1].id: null;
    const hasMoreMessages = newLastMessageId && endIndex < (messages.length - 1);

    yield delay(1000);

    yield put(messagesLoaded(
        conversationId,
        pageGroup,
        hasMoreMessages,
        newLastMessageId
    ));

    if (hasMoreMessages) {
        yield delay(1000);
        yield put({
            type: 'MESSAGES_REQUESTED',
            payload: {
                conversationId,
                numberOfMessages,
                lastMessageId: newLastMessageId
            }
        })
    }
}

export const watchGetMessagesAsync = function*() {
    yield takeLatest('MESSAGES_REQUESTED', messagesSaga);
}