import React from 'react'
import gql from 'graphql-tag'
import { withApollo, WithApolloClient } from 'react-apollo'
import {
  Banner,
  Button,
  Card,
  Form,
  FormLayout,
  TextField,
} from '@shopify/polaris'

interface EnqueueSubmitProps {}

type EnqueueSubmitPropsWithApollo = WithApolloClient<EnqueueSubmitProps>

const enqueueMutation = gql`
  mutation enqueue($input: NewJobInput!) {
    enqueue(newJobData: $input) {
      taskId
      jobId
    }
  }
`

class EnqueueForm extends React.Component<EnqueueSubmitPropsWithApollo> {
  state = {
    errorHead: '', // :/
    errorText: '', // :/
    hasError: false, // :/
    submitSuccess: false,

    jobId: '',
    taskId: '',
    startIn: '',
    startAt: '',
    cron: '',
  }

  handleSubmit = async () => {
    const { client } = this.props
    const { taskId } = this.state

    if (!taskId) {
      this.setState({
        errorHead: 'Validation failed',
        errorText: 'Tou need to fill the Task ID field.',
        hasError: true,
      })
      return
    }

    let result
    try {
      result = await client.mutate({
        mutation: enqueueMutation,
        variables: {
          input: {
            taskId: taskId,
            image: 'ubuntu',
            command: 'ls -lah',
          },
        },
      })
    } catch (err) {
      this.setState({
        errorHead: 'Fail to enqueue the job',
        errorText:
          'Contact the support team and ask for help with Fastlane Enqueue service.',
        hasError: true,
      })
      console.error(err)
      return
    }

    this.setState({
      submitSuccess: true,
    })

    this.cleanForm()
  }

  handleChange = (field: string) => {
    return (value: string) => this.setState({ [field]: value })
  }

  cleanForm = () => {
    this.setState({
      errorHead: '',
      errorText: '',
      hasError: false,
      submitSuccess: false,

      jobId: '',
      taskId: '',
      startIn: '',
      startAt: '',
      cron: '',
    })
  }

  render() {
    const {
      errorHead,
      errorText,
      hasError,
      submitSuccess,

      taskId,
      jobId,
      startIn,
      startAt,
      cron,
    } = this.state

    return (
      <Form onSubmit={this.handleSubmit}>
        {hasError && (
          <Banner title={errorHead} status="critical">
            <p>{errorText}</p>
          </Banner>
        )}

        {submitSuccess && (
          <Banner title="Task enqueued with success" status="success" />
        )}

        <FormLayout>
          <Card title="Job details">
            <Card.Section title="Identification">
              <FormLayout.Group>
                <TextField
                  value={taskId}
                  onChange={this.handleChange('taskId')}
                  label="Task ID"
                  type="text"
                  helpText={<span>Task id to enqueue a new job under.</span>}
                />
                <TextField
                  value={jobId}
                  onChange={this.handleChange('jobId')}
                  label="Job ID (optional)"
                  type="text"
                  helpText={
                    <span>
                      Job id to enqueue a new job under. This value is optional.
                    </span>
                  }
                />
              </FormLayout.Group>
            </Card.Section>

            <Card.Section title="Scheduling">
              <FormLayout.Group condensed={true}>
                <TextField
                  value={startIn}
                  onChange={this.handleChange('startIn')}
                  label="Job delay"
                  type="text"
                  helpText={
                    <span>Amount of time to delay starting this job.</span>
                  }
                />
                <TextField
                  value={startAt}
                  onChange={this.handleChange('startAt')}
                  label="Job start date"
                  type="text"
                  helpText={
                    <span>Datetime when this job will start running.</span>
                  }
                />
                <TextField
                  value={cron}
                  onChange={this.handleChange('cron')}
                  label="Periodic scheduling (CRON)"
                  type="text"
                  helpText={
                    <span>
                      CronTab style scheduling of jobs. Ex.: 0 * * * * (every
                      hour)
                    </span>
                  }
                />
              </FormLayout.Group>
            </Card.Section>
          </Card>
          <Button submit={true}>Enqueue</Button>
        </FormLayout>
      </Form>
    )
  }
}

const EnqueueFormMutation = withApollo(EnqueueForm)

export default EnqueueFormMutation
