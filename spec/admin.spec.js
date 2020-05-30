/**
 * helper.js 에서 만든 설정과 teardown 을 import 하낟.
 */
const { setup, teardown } = require('./helper');

describe('Database rules', () => {

    /// 테스트를 할 때, 설정을 한다.
    beforeAll(async () => {
    });


    /// 테스트가 끝나면 생성된 앱을 모두 제거한다.
    afterAll(async () => {
        await teardown();
    })

    test('success on reading without login', async () => {
        const db = await setup();
        const col = db.collection('categories');
        await expect(col.limit(10).get()).toAllow();
    });

    test('fail on creating without login', async () => {
        const db = await setup();
        const col = db.collection('categories');
        await expect(col.add({ id: 'abc' })).toDeny();
    });

    test('fail on creating with non-admin account.', async () => {
        const db = await setup({ uid: 'temp-uid' });
        const col = db.collection('categories');
        await expect(col.add({ id: 'abc' })).toDeny();
    });

    test('success on creating a category with admin account.', async () => {
        const db = await setup({ uid: 'temp-uid', email: 'thruthesky@gmail.com' });
        const col = db.collection('categories');
        await expect(col.doc('abc').set({ id: 'abc', title: 'alphabet' })).toAllow();
    });

    test('failed on updating a category with non-admin account.', async () => {
        const db = await setup({ uid: 'uid', email: 'non-admin@gmail.com' });
        const col = db.collection('categories');
        await expect(col.doc('abc').update({ title: 'updated title' })).toDeny();
    });
    test('success on reading a category with non-admin account.', async () => {
        const db = await setup({ uid: 'temp-uid', email: 'non-admin@gmail.com' });
        const col = db.collection('categories');
        await expect(col.doc('abc').get()).toAllow();
    });
    test('fail on changing a category id with admin account.', async () => {
        const db = await setup({ uid: 'temp-uid', email: 'thruthesky@gmail.com' }, {
            'categories/abc': {
                id: 'abc',
                title: 'alphabet',
            }
        });
        const col = db.collection('categories');
        await expect(col.doc('abc').update({ id: 'change-should-be-denied' })).toDeny();
    });


    test('success on updating with same id but different title with admin account.', async () => {
        const db = await setup({ uid: 'temp-uid', email: 'thruthesky@gmail.com' }, {
            'categories/abc': {
                id: 'abc',
                title: 'alphabet',
            }
        });
        const col = db.collection('categories');
        await expect(col.doc('abc').update({ id: 'abc', title:'new title' })).toAllow();
    });


});