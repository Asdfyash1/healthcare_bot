from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.admin.views.decorators import staff_member_required
from django.contrib.auth.models import User
from django.contrib import messages
from chatbot.models import QnA
from .forms import QnAForm


@staff_member_required
def manage_qa(request):
    """List all Q&A entries."""
    qna_list = QnA.objects.all()
    return render(request, 'admin_panel/manage_qa.html', {'qna_list': qna_list})


@staff_member_required
def add_qa(request):
    """Add a new Q&A entry."""
    if request.method == 'POST':
        form = QnAForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Q&A entry added successfully!')
            return redirect('manage_qa')
    else:
        form = QnAForm()
    return render(request, 'admin_panel/add_qa.html', {'form': form})


@staff_member_required
def edit_qa(request, id):
    """Edit an existing Q&A entry."""
    qna = get_object_or_404(QnA, id=id)
    if request.method == 'POST':
        form = QnAForm(request.POST, instance=qna)
        if form.is_valid():
            form.save()
            messages.success(request, 'Q&A entry updated successfully!')
            return redirect('manage_qa')
    else:
        form = QnAForm(instance=qna)
    return render(request, 'admin_panel/edit_qa.html', {'form': form, 'qna': qna})


@staff_member_required
def delete_qa(request, id):
    """Delete a Q&A entry with confirmation."""
    qna = get_object_or_404(QnA, id=id)
    if request.method == 'POST':
        qna.delete()
        messages.success(request, 'Q&A entry deleted successfully!')
        return redirect('manage_qa')
    return render(request, 'admin_panel/delete_qa.html', {'qna': qna})


@staff_member_required
def view_users(request):
    """List all registered users."""
    users = User.objects.all().order_by('-date_joined')
    return render(request, 'admin_panel/view_users.html', {'users': users})
