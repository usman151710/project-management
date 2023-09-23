import { memo } from 'react';
import { Badge, Button, Card, Image, List, Typography, Modal } from "antd";
import { GithubOutlined, LinkOutlined, EditOutlined, DownloadOutlined, CheckCircleOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import './ProjectList.css';

const { confirm } = Modal;

const ProjectList = ({ data, isEdit = false, isArchive = false, isComplete = false, showModal }) => {

    const showConfirm = (item) => {
        confirm({
            title: `Do you Want to archive ${item.name}`,
            icon: <ExclamationCircleFilled />,
            content: item.description,
            onOk() {
                console.log('OK');
                // update status api call here e.g archive
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const handleComplete = () => {
        //update status api here e.g complete
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
                            <div>
                                {item.techStacks.map((item) => (
                                    <Badge key={item} className="badge" status="default" text={item} />
                                ))}
                            </div>
                            <Badge className="badge" status="success" text={item.status} />
                            <div className="action-container">
                                {isEdit && (<Button onClick={() => showModal(item)} icon={<EditOutlined />}>Edit</Button>)}
                                {isArchive && (<Button onClick={() => showConfirm(item)} icon={<DownloadOutlined />}>Archive</Button>)}
                                {isComplete && (<Button icon={<CheckCircleOutlined />}>Complete</Button>)}
                            </div>
                        </div>
                    </div>
                </Card>
            )}
        />
    )
}

export default memo(ProjectList);