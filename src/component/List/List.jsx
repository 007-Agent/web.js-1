import React from 'react'
import PropTypes from 'prop-types'

import { TGroup, TIcon, merge, clone } from 'tinput'

import Ref from 'component/Ref'

import styles from './styles.js'

class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: null
    }
    this.handleAdd = this.handleAdd.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.clearValue = this.clearValue.bind(this)
  }

  clearValue() {
    this.setState({ value: null })
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (
      this.props.value !== nextProps.value ||
      this.props.id !== nextProps.id ||
      this.state.value !== nextState.value
    )
  }

  handleAdd(event) {
    this.setState({ value: event.value }, () => {
      if (event.item && event.index >= 0) {
        let value = this.props.value ? clone(this.props.value) : []
        value.push(event.item)
        if (this.props.onChange) {
          this.props.onChange({
            name: this.props.name,
            data: this.props.data,
            value: value
          })
        }
      }
      this.clearValue()
    })
  }

  handleDelete(event) {
    let index = event.data
    if (index >= 0) {
      let value = clone(this.props.value)
      value.splice(index, 1)
      if (this.props.onChange) {
        this.props.onChange({
          name: this.props.name,
          data: this.props.data,
          value: value
        })
      }
    }
    this.clearValue()
  }

  render() {
    let style = merge(styles, this.props.style)

    let list = this.props.value
      ? this.props.value.map((v, i) => {
          let item = this.props.onItem ? (
            this.props.onItem({ item: v, style: style, index: i })
          ) : (
            <div style={style.text}>{v.name}</div>
          )
          return (
            <div key={i} style={style.item}>
              {item}
              <TIcon
                style={style.iconDelete}
                name={'delete'}
                onClick={this.handleDelete}
                data={i}
              />
            </div>
          )
        })
      : null

    return (
      <TGroup style={style.group} label={this.props.label}>
        {list}

        <div style={style.bottom}>
          <Ref
            style={style.ref}
            id={this.props.id}
            table={this.props.table}
            value={this.state.value}
            icon={this.props.showIcon ? 'add' : undefined}
            showEdit={true}
            readOnly={true}
            name={'ref'}
            modal={this.props.modal}
            caption={this.props.label || this.props.caption}
            placeholder={this.props.placeholder}
            chars={this.props.chars}
            onSearch={this.props.onSearch}
            onChange={this.handleAdd}
          />
        </div>
      </TGroup>
    )
  }
}

List.propTypes = {
  style: PropTypes.object,
  value: PropTypes.array,
  label: PropTypes.string,
  name: PropTypes.string,
  data: PropTypes.any,
  table: PropTypes.string,
  id: PropTypes.number,
  modal: PropTypes.any,
  caption: PropTypes.any,
  chars: PropTypes.number,
  placeholder: PropTypes.string,
  showIcon: PropTypes.any,
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
  onItem: PropTypes.func
}

List.defaultProps = {
  showIcon: true
}

export default List
