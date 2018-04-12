import { mapStateToProps, mapDispatchToProps } from './FilterLink';

describe('containers', () => {
  describe('<FilterLink />', () => {
    describe('mapStateToProps', () => {
      it('should return props with active: true if visibilityFilter matched', () => {
        const state = { visibilityFilter: 'SHOW_ALL' };
        const ownProps = { filter: 'SHOW_ALL' };
        const expectedProps = { active: true };

        expect(mapStateToProps(state, ownProps)).toEqual(expectedProps);
      });

      it('should return props with active: false if visibilityFilter didn\'t match', () => {
        const state = { visibilityFilter: 'SHOW_ACTIVE' };
        const ownProps = { filter: 'SHOW_ALL' };
        const expectedProps = { active: false };

        expect(mapStateToProps(state, ownProps)).toEqual(expectedProps);
      });
    });

    describe('mapDispatchToProps', () => {
      it('should call dispatch function if returned function is called', () => {
        const testMock = jest.fn();
        const ownProps = { filter: 'SHOW_ALL' };
        mapDispatchToProps(testMock, ownProps).onClick();
        expect(testMock).toBeCalled();
      });
    });
  });
});
