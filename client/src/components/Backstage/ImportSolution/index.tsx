import React, { Component } from 'react'
import Content from '../Content'

import { TextField } from 'office-ui-fabric-react/lib/TextField'
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button'

interface IProps {
  importGist: (gistId?: string, gist?: string) => void
}

interface IState {
  importFieldText: string
}

// TODO: incorp. localization
class ImportSolution extends Component<IProps, IState> {
  state = { importFieldText: '' }

  render() {
    return (
      <Content
        title="Import snippet"
        description="Enter the snippet's URL or paste the YAML below, then choose Import."
      >
        <span className="ms-font-m">SNIPPET URL OR YAML</span>
        <TextField
          multiline={true}
          rows={8}
          onChanged={this.updateImportFieldText}
          placeholder="e.g.: https://gist.github.com/sampleGistId"
        />
        <PrimaryButton
          style={{ marginTop: '1.5rem', float: 'right' }}
          text="Import"
          onClick={this.onImportClick}
        />
      </Content>
    )
  }

  private updateImportFieldText = (importFieldText: string) =>
    this.setState({ importFieldText })

  private onImportClick = () => {
    const input = this.state.importFieldText.trim()
    let gistId
    let gist

    if (input.startsWith('https://gist.github.com/')) {
      gistId = input.split('/').pop()
    } else {
      gist = input
    }

    this.props.importGist(gistId, gist)
    this.setState({ importFieldText: '' })
  }
}

export default ImportSolution
