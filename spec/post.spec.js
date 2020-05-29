
const { setup, teardown } = require('./helper');
describe('Post', () => {

    const mockData = {
        "posts/post-id-1": {
            uid: "thruthesky",
            title: "this is the title."
        },
    };
    const mockUser = {
        uid: "thruthesky"
    };


    /// 테스트를 할 때, 설정을 한다.
    beforeAll(async () => {

    });

    /// 테스트가 끝나면 생성된 앱을 모두 제거한다.
    afterAll(async () => {
        await teardown();
    });

    test('Create a post', async () => {
        
        /// without login
        const db = await setup({}, mockData);
        const postsCol = db.collection('posts');

        await expect(postsCol.doc('post-id-2').set({ uid: 'my-id', title: 'title' })).toAllow();
    });



    test('should fail on wrong user update', async () => {
        /// 저장된 도큐먼트 ID 가 `wrong-uid`
        const mockData = {
            "users/wrong-uid": {
                displayName: "wrong-name"
            },
        };
        /// 로그인은 `thruthesky` 로 함.
        const mockUser = {
            uid: "thruthesky"
        };
        const db = await setup(mockUser, mockData);
        usersCol = db.collection('users');

        /// 로그인을 `thruthesky`로 했는데, `wrong-uid` 도큐먼트를 수정하려고 함
        await expect(usersCol.doc('wrong-uid').update({ data: 'something', birthday: '123456' })).toDeny();
    });




});