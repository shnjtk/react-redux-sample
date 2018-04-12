import { mapStateToProps, mapDispatchToProps } from './VisibleTodoList';

describe('container', () => {
  describe('<VisibleTodoList />', () => {
    describe('mapStateToProps', () => {
      describe('Filter === SHOW_ALL', () => {
        it('should return all todos', () => {
          const todo1 = { text: 'DO TEST', completed: false };
          const todo2 = { text: 'DO MORE TEST', completed: true };
          const filter = 'SHOW_ALL'
          const state = { todos: [todo1, todo2], visibilityFilter: filter };

          const expectedState = { todos: [todo1, todo2] };
          expect(mapStateToProps(state)).toEqual(expectedState);
        });
      });

      describe('Filter === SHOW_COMPLETED', () => {
        it('should return completed todos only', () => {
          const todo1 = { text: 'DO TEST', completed: false };
          const todo2 = { text: 'DO MORE TEST', completed: true };
          const filter = 'SHOW_COMPLETED'
          const state = { todos: [todo1, todo2], visibilityFilter: filter };

          const expectedState = { todos: [todo2] };
          expect(mapStateToProps(state)).toEqual(expectedState);
        });
      });

      describe('Filter === SHOW_ACTIVE', () => {
        it('should return active (not completed) todos only', () => {
          const todo1 = { text: 'DO TEST', completed: false };
          const todo2 = { text: 'DO MORE TEST', completed: true };
          const filter = 'SHOW_ACTIVE'
          const state = { todos: [todo1, todo2], visibilityFilter: filter };

          const expectedState = { todos: [todo1] };
          expect(mapStateToProps(state)).toEqual(expectedState);
        });
      });
    });

    describe('mapDispatchToProps', () => {
      it('should call dispatch function if returned function is called', () => {
        const testMock = jest.fn();
        mapDispatchToProps(testMock).onTodoClick(0);
        expect(testMock).toBeCalled();
      });
    });
  });
});
