from django.db import models


class QnA(models.Model):
    """
    Stores question-answer pairs for the CureX health engine.
    """
    question = models.CharField(max_length=255, default="New Medical Question", help_text="A natural language question (e.g. What is insulin?)")
    label = models.CharField(max_length=100, unique=True, help_text="A unique identifier for this topic (e.g. diabetes_basics)")
    answer = models.TextField()
    keywords = models.TextField(blank=True, help_text="Comma-separated keywords for this label")

    class Meta:
        verbose_name = "Q&A"
        verbose_name_plural = "Q&As"
        ordering = ['label']

    def __str__(self):
        return f"{self.label}: {self.question[:30]}..."


class ChatMessage(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE, related_name='chat_messages')
    message = models.TextField()
    response = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return f"{self.user.username}: {self.message[:20]}..."
