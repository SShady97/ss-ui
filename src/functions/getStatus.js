
const getStatus = async (task_id, task_name, poll_sec=1000) => {

    let check_url = `${process.env.REACT_APP_API_URL}/api/check/${task_id}/${task_name}?external=True`;
    
    try {

        const responseTask = await fetch(check_url, { method: 'GET' });
        const resultTask = await responseTask.json();

        switch (resultTask.data.task_name) {

            case 'tasks.winrm-exec_users':
                let taskStatus = resultTask.data.task_status;
                if (taskStatus === 'SUCCESS') {
                    return resultTask.data.task_result.users;
                }
                break;
                
        }

        setTimeout(function() {
            getStatus(resultTask.data.task_id, resultTask.data.task_name);
        }, poll_sec);
        
    } catch (error) {
        console.log(error)
    };
}

export default getStatus;