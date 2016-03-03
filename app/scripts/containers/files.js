import React, {Component, PropTypes} from 'react'
import {Row, Col} from 'react-bootstrap'
import {connect} from 'react-redux'

import Explorer from '../components/files/explorer'
import {
  loadFilesPage,
  leaveFilesPage,
  filesSetRoot,
  filesCreateTmpDir,
  filesSetTmpDirName,
  filesCreateDir,
  filesRmTmpDir
} from '../actions'

class Files extends Component {
  static propTypes = {
    loadFilesPage: PropTypes.func.isRequired,
    leaveFilesPage: PropTypes.func.isRequired,
    files: PropTypes.array.isRequired,
    root: PropTypes.string.isRequired,
    tmpDir: PropTypes.shape({
      root: PropTypes.string.isRequired,
      name: PropTypes.string
    }),
    filesSetRoot: PropTypes.func.isRequired,
    filesCreateTmpDir: PropTypes.func.isRequired,
    filesSetTmpDirName: PropTypes.func.isRequired,
    filesCreateDir: PropTypes.func.isRequired,
    filesRmTmpDir: PropTypes.func.isRequired
  };

  componentWillMount () {
    this.props.loadFilesPage()
  }

  componentWillUnmount () {
    this.props.leaveFilesPage()
  }

  render () {
    return (
      <Row>
        <Col sm={10} smOffset={1}>
          <Explorer
            files={this.props.files}
            root={this.props.root}
            tmpDir={this.props.tmpDir}
            setRoot={this.props.filesSetRoot}
            createTmpDir={this.props.filesCreateTmpDir}
            setTmpDirName={this.props.filesSetTmpDirName}
            createDir={this.props.filesCreateDir}
            rmTmpDir={this.props.filesRmTmpDir}/>
        </Col>
      </Row>
    )
  }
}

function mapStateToProps (state) {
  const {files} = state

  return {
    files: files.list,
    root: files.root,
    tmpDir: files.tmpDir
  }
}

export default connect(mapStateToProps, {
  loadFilesPage,
  leaveFilesPage,
  filesSetRoot,
  filesCreateTmpDir,
  filesSetTmpDirName,
  filesCreateDir,
  filesRmTmpDir
})(Files)