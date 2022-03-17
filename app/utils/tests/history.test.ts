import history from '../history';

describe('history tests', () => {
  it("should create history object with pathname '/'", () => {
    expect(history).toEqual(
      expect.objectContaining({
        block: expect.any(Function),
        createHref: expect.any(Function),
        go: expect.any(Function),
        goBack: expect.any(Function),
        goForward: expect.any(Function),
        listen: expect.any(Function),
        location: { hash: '', pathname: '/', search: '', state: undefined },
        push: expect.any(Function),
        replace: expect.any(Function)
      })
    );
  });
});
