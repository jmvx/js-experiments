var catApp = angular.module('catApp', []);

catApp.controller('listCatsController', function ($scope) {
  $scope.post = {
    'name': 'Experimenting with Angular',
    'author': 'Julia Van Cleve'
  }
  $scope.cats = [
    { 'name': 'Jellybean',
      'bio': 'She is MY cat. She is in Phoenix right now.' },
    { 'name': 'Jacq',
      'bio': 'I live with Jacq. He pukes on the carpet and pees on my chair.' },
    { 'name': 'Maeby',
      'bio': 'She was my cat. She lives with Ryan down the street.' },
    { 'name': 'Vesta',
      'bio': 'Vesta drools on me.' }
  ];
});