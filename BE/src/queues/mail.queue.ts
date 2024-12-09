import BetterQueue from 'better-queue'
import SendEmalCheckOutOrder from '../helper/EmailOrder';

interface ITask {
    type: string
    email: string
    trackingNumber: string
}

const emailQueue = new BetterQueue(async (task: ITask, cb:any) => {
    try {
        console.log({task})
        if (task.type === 'createOrder') {
            await SendEmalCheckOutOrder.sendNotificationCheckoutOrder(task.email, task.trackingNumber);
        } else if (task.type === 'cancelOrder') {
            await SendEmalCheckOutOrder.sendCancellationNotification(task.email, task.trackingNumber);
        }
        console.log(`Email sent for task type: ${task.type}`);
        cb(null, `Email sent for task type: ${task.type}`);
    } catch (error) {
        console.error(`Failed to send email for task type ${task.type}:`, error);
        cb(error);
    }
}, {
    concurrent: 5,
    maxRetries: 3,
    retryDelay: 5000,
});

emailQueue.on('task_finish', (taskId: any, result: any) => {
    console.log(`Task ${taskId} completed:`, result);
});

emailQueue.on('task_failed', (taskId: any, error: any) => {
    console.error(`Task ${taskId} failed:`, error);
});

export default emailQueue