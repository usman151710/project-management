import { memo } from 'react';
import { Badge, Button, Card, Image, List, Typography, Modal } from "antd";
import { GithubOutlined, LinkOutlined, EditOutlined, DownloadOutlined, CheckCircleOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import './ProjectList.css';
import { updateProjectStatusAPI } from '../../services/projects';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useProjectsContext } from '../../hooks/useProjectsContext';
import { ProjectStatus } from '../../config/constants';

const { confirm } = Modal;

const ProjectList = ({ data, isEdit = false, isArchive = false, isComplete = false, showModal }) => {

    const { user } = useAuthContext();
    const { dispatch } = useProjectsContext();

    const updateProjectStatus = async (id, data) => {
        try {
            const response = await updateProjectStatusAPI(id, data, user.token);
            const json = await response.json();
            if (response.ok) {
                dispatch({ type: "UPDATE_PROJECT", payload: json });
            }
        } catch (error) {
            console.log('error: ', error);
        }
    }

    const showConfirm = (item) => {
        confirm({
            title: `Do you Want to archive ${item.name}`,
            icon: <ExclamationCircleFilled />,
            content: item.description,
            onOk() {
                updateProjectStatus(item._id, {
                    status: ProjectStatus.ARCHIVED
                })
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const handleComplete = (item) => {
        updateProjectStatus(item._id, { status: ProjectStatus.COMPLETED });
    }

    return (
        <List
            size="large"
            grid={{ gutter: 16, column: 2 }}
            dataSource={data}
            renderItem={(item) => (
                <Card key={item._id} className="card" >
                    <div className="card-container">
                        <Image
                            preview={false}
                            width={100}
                            src={item.imageUrl}
                        />
                        <div className="card-content">
                            <Typography.Title className="card-heading" level={5}>{item.name}</Typography.Title>
                            <Typography.Text className="card-description">{item.description}</Typography.Text>
                            <div className="link-container">
                                <Typography.Link href={item.siteUrl} target="_blank">
                                    <LinkOutlined />
                                </Typography.Link>
                                <Typography.Link href={item.githubUrl} target="_blank">
                                    <GithubOutlined />
                                </Typography.Link>
                            </div>
                            <Typography.Text>{item.techStacks}</Typography.Text>
                            <Badge className="badge" status="success" text={item.status} />
                            <div className="action-container">
                                {isEdit && (<Button onClick={() => showModal(item)} icon={<EditOutlined />}>Edit</Button>)}
                                {isArchive && (<Button onClick={() => showConfirm(item)} icon={<DownloadOutlined />}>Archive</Button>)}
                                {isComplete && (<Button onClick={() => handleComplete(item)} icon={<CheckCircleOutlined />}>Complete</Button>)}
                            </div>
                        </div>
                    </div>
                </Card>
            )}
        />
    )
}

export default memo(ProjectList);