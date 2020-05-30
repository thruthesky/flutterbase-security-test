
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

    test('fail on creating a post without login', async () => {
        /// 로그인을 하지 않은 채 글 쓰기
        const db = await setup();
        const postsCol = db.collection('posts');
        await expect(postsCol.doc('post-id-2').set({ uid: 'my-id', title: 'title' })).toDeny();
    });

    /// 실패
    /// 다른 사람의 UID 로 글 생성 테스트.
    test("fail on creating a post with other user's uid", async() => {
        const db = await setup(mockUser);
        const postsCol = db.collection('posts');
        await expect(postsCol.add({ uid: 'other-uid', title: 'title' })).toDeny();
    });


    test('success on creating a post with login', async () => {
        const db = await setup(mockUser);
        const postsCol = db.collection('posts');
        await expect(postsCol.add({ uid: mockUser.uid, title: 'title' })).toAllow();
    });


    test('fail on updating a post with wrong user', async () => {
        const db = await setup({ uid: 'wrong-user' }, mockData);
        const postsCol = db.collection('posts');
        await expect(postsCol.doc('post-id-1').update({ uid: 'my-id', title: 'title' })).toDeny();
    });


    test('fail on updating a post create by another user', async () => {
        const db = await setup(mockUser, {
            "posts/post-id-1": {
                uid: "written-by-another-user",
                title: "this is the title."
            }
        });
        const postsCol = db.collection('posts');
        await expect(postsCol.doc('post-id-1').update({ uid: mockUser.uid, title: 'title' })).toDeny();
    });

    test('success on updating my post', async () => {
        ///
        const db = await setup(mockUser, mockData);
        const postsCol = db.collection('posts');
        await expect(postsCol.doc('post-id-1').update({ uid: mockUser.uid, title: 'title' })).toAllow();
    });



    test("fail on deleting another's post", async () => {
        const db = await setup(mockUser, {
            "posts/post-id-3": {
                uid: "written-by-another-user",
                title: "this is the title."
            }
        });
        const postsCol = db.collection('posts');
        await expect(postsCol.doc('post-id-3').delete()).toDeny();
    });



    test("success on deleting my post", async () => {
        const db = await setup(mockUser, mockData);
        const postsCol = db.collection('posts');
        await expect(postsCol.doc('post-id-1').delete()).toAllow();
    });



});