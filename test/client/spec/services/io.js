'use strict';

describe('Service: IO', function () {

  // load the service's module
  beforeEach(module('tpttApp'));

  // instantiate service
  var IO;
  beforeEach(inject(function (_IO_) {
    IO = _IO_;
  }));

  it('should do something', function () {
    expect(!!IO).toBe(true);
  });

});
