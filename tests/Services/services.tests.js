describe('starter.services', function() {
      var friendService;


  beforeEach(module('starter.services'));

  beforeEach(inject(function(_Friends_) {
    Friends = _Friends_;
  }));

  it('can get an instance', inject(function(Friends) {
    expect(Friends).toBeDefined();
  }));

  it('has five chats', inject(function(Friends) {
    expect(Friends.all().length).toEqual(5);
  }));

  it('has Max as a friend with an ID 1', inject(function(Friends) {
    var oneFriend =  {
      id: 1,
      name: 'Max Lynx',
      lastText: 'Hey, it\'s me',
      face: 'img/max.png'
    };
  expect(Friends.get(1).name).toEqual(oneFriend.name);

  }));
});