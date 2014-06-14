'use strict';

describe('Directive: TypingTutor', function () {

  // load the directive's module
  beforeEach(module('tpttApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<-typing-tutor></-typing-tutor>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the TypingTutor directive');
  }));
});
