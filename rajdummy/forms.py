# -*- coding: utf-8 -*-
from django import forms
from django.db import models
from form_utils.fields import ClearableFileField


class DocumentForm(forms.Form):

    docfile = forms.FileField(
         label='', show_hidden_initial='none',required=True,

)


