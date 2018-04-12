import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions } from '../todos';

export let AddTodo = ({ dispatch, text = undefined }) => {
  let input;

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (!input.value.trim()) {
            return;
          }
          dispatch(actions.addTodo(input.value));
          input.value = '';
        }}
      >
        <input
          ref={node => {
            input = node
          }}
          defaultValue={text}
        />
        <button type="submit">
          Add Todo
        </button>
      </form>
    </div>
  );
};

AddTodo.propTypes = {
  dispatch: PropTypes.func.isRequired,
  text: PropTypes.string
};

export default connect()(AddTodo);
