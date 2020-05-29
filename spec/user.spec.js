
const { setup, teardown } = require('./helper');
describe('User', () => {
    let db;
    let usersCol;

    /// 테스트를 할 때, 설정을 한다.
    beforeAll(async () => {

        const mockData = {
            "users/thruthesky": {
                uid: "thruthesky"
            },
            "users/id1": {
                uid: "id1"
            },
            "users/id2": {
                uid: "id1"
            }
        };

        const mockUser = {
            uid: "thruthesky"
        };


        db = await setup(mockUser, mockData);

        usersCol = db.collection('users');
    });



    /// 테스트가 끝나면 생성된 앱을 모두 제거한다.
    afterAll(async () => {
        await teardown();
    })


    test('should fail', async () => {
        await expect(usersCol.add({ data: 'something' })).toDeny();
    });



});