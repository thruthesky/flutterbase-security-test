
const { setup, teardown } = require('./helper');
describe('User', () => {



    /// 테스트를 할 때, 설정을 한다.
    beforeAll(async () => {

    });



    /// 테스트가 끝나면 생성된 앱을 모두 제거한다.
    afterAll(async () => {
        await teardown();
    });

    test('creating without login', async () => {
        const db = await setup();
        const usersCol = db.collection('users');
        await expect(usersCol.add({})).toDeny();
    });


    test('reating with login', async () => {
        const db = await setup({uid: 'uid'});
        const usersCol = db.collection('users');
        await expect(usersCol.add({data: 'something'})).toAllow();
    });


    test('should success on update & get', async () => {
        const mockData = {
            "users/thruthesky": {
                displayName: "thruthesky"
            },
        };
        const mockUser = {
            uid: "thruthesky"
        };
        const db = await setup(mockUser, mockData);
        usersCol = db.collection('users');

        await expect(usersCol.doc(mockUser.uid).update({ data: 'something', birthday: '123456' })).toAllow();

        const snapshot = await usersCol.doc(mockUser.uid).get();

        const data = snapshot.data();
        expect(data.birthday).toEqual('123456');
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