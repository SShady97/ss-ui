
const getStatus = async (task_id, task_name, poll_sec=1000) => {

    let check_url = `${process.env.REACT_APP_API_URL}/api/check/${task_id}/${task_name}?external=True`;
    
    try {

        let taskStatus;

        const responseTask = await fetch(check_url, { method: 'GET' });
        const resultTask = await responseTask.json();

        switch (resultTask.data.task_name) {

            case 'tasks.winrm-exec_users':
                taskStatus = resultTask.data.task_status;
                if (taskStatus === 'SUCCESS') {
                    return resultTask.data.task_result.users;
                }
                break;
            case 'tasks.winrm-servers':
                taskStatus = resultTask.data.task_status;
                if (taskStatus === 'SUCCESS') {
                    return resultTask.data.task_result.servers;
                }
                break;
            case 'tasks.winrm-scripts':
                taskStatus = resultTask.data.task_status;
                if (taskStatus === 'SUCCESS') {
                    return resultTask.data.task_result.scripts;
                }
                break;
            case 'tasks.winrm-params':
                taskStatus = resultTask.data.task_status;
                if (taskStatus === 'SUCCESS') {
                    return resultTask.data.task_result.params;
                }
                break;
            case 'tasks.winclient':
                taskStatus = resultTask.data.task_status;
                if (taskStatus === 'SUCCESS') {
                    return {status: taskStatus, result: resultTask.data.task_result};
                }
                break;
            
            default:
                return 'No se ha encontrado la tarea';
        }

        return {status: taskStatus};
        
    } catch (error) {
        console.log(error)
    };
}

export default getStatus;