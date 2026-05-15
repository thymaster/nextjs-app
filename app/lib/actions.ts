'use server';

export async function createInvoice(formData: FormData) {
    const rowFormData = {
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    }
    console.log('Creating invoice with data:', rowFormData);
}