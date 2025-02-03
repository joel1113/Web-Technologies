var app = angular.module('financeTrackerApp', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/dashboard', {
            templateUrl: 'dashboard.html',
            controller: 'DashboardController'
        })
        .when('/expenses', {
            templateUrl: 'expenses.html',
            controller: 'ExpensesController'
        })
        .when('/income', {
            templateUrl: 'income.html',
            controller: 'IncomeController'
        })
        .otherwise({
            redirectTo: '/dashboard'
        });
});

app.controller('DashboardController', function($scope, FinanceService) {
    $scope.income = FinanceService.getIncome();
    $scope.expenses = FinanceService.getExpenses();

    $scope.totalIncome = $scope.income.reduce((sum, item) => sum + item.amount, 0);
    $scope.totalExpenses = $scope.expenses.reduce((sum, item) => sum + item.amount, 0);
    $scope.balance = $scope.totalIncome - $scope.totalExpenses;
});

app.controller('ExpensesController', function($scope, $location, FinanceService) {
    $scope.expenses = FinanceService.getExpenses();

    $scope.addExpense = function() {
        FinanceService.addExpense({
            description: $scope.description,
            amount: $scope.amount
        });
        $scope.description = '';
        $scope.amount = '';
        $location.path('/expenses'); // Redirect to expenses page
    };
});

app.controller('IncomeController', function($scope, $location, FinanceService) {
    $scope.income = FinanceService.getIncome();

    $scope.addIncome = function() {
        FinanceService.addIncome({
            source: $scope.source,
            amount: $scope.amount
        });
        $scope.source = '';
        $scope.amount = '';
        $location.path('/income'); // Redirect to income page
    };
});

app.service('FinanceService', function() {
    var income = [];
    var expenses = [];

    return {
        getIncome: function() {
            return income;
        },
        addIncome: function(entry) {
            income.push(entry);
        },
        getExpenses: function() {
            return expenses;
        },
        addExpense: function(entry) {
            expenses.push(entry);
        }
    };
});
