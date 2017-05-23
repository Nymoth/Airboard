import { AirboardPage } from './app.po';

describe('airboard App', function() {
  let page: AirboardPage;

  beforeEach(() => {
    page = new AirboardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
