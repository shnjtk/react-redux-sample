import reducers, { filters, actions } from './todos';
import { ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER } from './todos';

describe('todos', () => {
  describe('reducers', () => {
    describe('todos', () => {
      it('should return the initial state', () => {
        expect(reducers.todos(undefined, {})).toEqual([]);
      });

      it('should handle ADD_TODO', () => {
        const text = 'DO TEST';
        const action = {
          type: ADD_TODO,
          text: text,
          id: 0
        };
        const expectedState = [{
          text: text,
          completed: false,
          id: 0
        }];
        expect(reducers.todos([], action)).toEqual(expectedState);
      });

      it('should handle TOGGLE_TODO', () => {
        let existingTodo = {
          id: 0,
          completed: false,
          text: 'TEST TODO'
        };
        Object.freeze(existingTodo);
        let action = {
          type: TOGGLE_TODO,
          id: 0
        };
        let expectedTodo = { ...existingTodo, completed: !existingTodo.completed };
        expect(reducers.todos([existingTodo], action)).toEqual([expectedTodo]);
      });

      it('should ignore TOGGLE_TODO if there are no matched items', () => {
        let existingTodo = {
          id: 0,
          completed: false,
          text: 'TEST TODO'
        };
        let action = {
          type: TOGGLE_TODO,
          id: 1
        };
        expect(reducers.todos([existingTodo], action)).toEqual([existingTodo]);
      });
    });

    describe('visibilityFilter', () => {
      it('should return the initial state', () => {
        expect(reducers.visibilityFilter(undefined, {})).toEqual(filters.SHOW_ALL);
      });

      it('should handle SET_VISIBILITY_FILTER', () => {
        const state = {
          todos: [],
          visibilityFilter: filters.SHOW_ALL
        };
        const action = {
          type: SET_VISIBILITY_FILTER,
          filter: filters.SHOW_COMPLETED
        };
        expect(reducers.visibilityFilter(state, action)).toEqual(filters.SHOW_COMPLETED);
      });
    });
  });

  describe('action creators', () => {
    it('should create an action to add a todo', () => {
      const id = 0;
      const text = 'Finish docs';
      const expectedAction = {
        type: ADD_TODO,
        id,
        text
      };
      expect(actions.addTodo(text)).toEqual(expectedAction);
    });

    it('should create an action to change visibility filter condition', () => {
      const filter = filters.SHOW_ACTIVE;
      const expectedAction = {
        type: SET_VISIBILITY_FILTER,
        filter
      };
      actions.addTodo('sample todo');
      expect(actions.setVisibilityFilter(filter)).toEqual(expectedAction);
    });

    it('should create an action to toggle completion state', () => {
      const id = 0;
      const expectedAction = {
        type: TOGGLE_TODO,
        id
      };
      actions.addTodo('sample todo');
      expect(actions.toggleTodo(id)).toEqual(expectedAction);
    });
  })
});
