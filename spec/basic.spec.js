/**
 * helper.js 에서 만든 설정과 teardown 을 import 하낟.
 */
const { setup, teardown } = require('./helper');

/**
 * 그리고 operation 이 성공했는지 또는 실패했는지 알 수 있는 Assertion helper(테스트) 함수를 import 한다.
 * Assertion helper 함수들은 async operation 을 하는 1개의 인자를 가지는데, 예를 들면, ref.get() 과 같은 읽기 async 이다.
 * assertFails 는 rule 에 block 되면, resolve 된다. 즉, fail 을 expect 하는 것이다.
 * 그래서
 *      cosnt expectFailedRead = assertFails( ref.get () );
 * 와 같이 하면, fail 이 나면 정상인 것이다.
 * 그래서
 *      expect( expectFailedRead )
 * 테스트를 통과 하는 것이다.
 */
const { assertFails, assertSucceeds } = require('@firebase/testing');

describe('Database rules', () => {
    let db;
    let ref;

    /// 테스트를 할 때, 설정을 한다.
    beforeAll(async () => {
        db = await setup();

        /// 기본적으로 read, write false 이므로, 아무곳에 쓰면 에러가 난다.
        ref = db.collection('non-existing-collection');
    });


    /// 테스트가 끝나면 생성된 앱을 모두 제거한다.
    afterAll(async () => {
        await teardown();
    })

    /// 실제 테스트를 작성한다.
    test('fail when reading/writing on an unauthorized collection', async () => {

        /// 두 줄로 테스트 작성
        const expectFailedRead = await assertFails(ref.get());
        expect(expectFailedRead);

        /// 한 줄로 테스트 작성
        expect(await assertFails(ref.add({})));

        /// 이해하기 쉽게 작성
        await expect(ref.get()).toDeny();

        /// 또는 필요할 때 아래와 같이 작성하면 된다.
        // await expect(ref.get()).toAllow();
    });
});